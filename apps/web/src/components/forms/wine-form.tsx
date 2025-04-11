/* eslint-disable @next/next/no-img-element */
"use client";

import { Form } from "@repo/ui/components/ui/form";
import { useAuth } from "@/context/auth";
import { useWinery } from "@/context/winery";
import { wineFormSchema } from "@/data/form-schemas";
import { useAutosave } from "@/hooks/use-autosave";
import { db } from "@/lib/firebase/services/db";
import { storage } from "@/lib/firebase/services/storage";
import { DbResponse, Wine } from "@/types/db";
import { Timestamp } from "firebase/firestore";
import { LoaderCircle, Save } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import { Separator } from "@repo/ui/components/ui/separator";

import { useSystemVariables } from "@/context/system-variables";
import { useExtraValidations } from "@/hooks/use-extra-validations";
import { useKjAndKcal } from "@/hooks/use-kj-and-kcal";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { toast } from "@repo/ui/hooks/use-toast";
import { base64ToImageFile } from "@/utils/image-utils";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/navigation";
import { FileWithPath, useDropzone } from "react-dropzone";
import { QRCodeDialog } from "../dialogs/qrcode-dialog";
import { ImageCropper } from "@/components/widgets/image-cropper";
import { WineCarbohydratesField } from "./fields/wine/wine-carbohydrates-field";
import { WineCrudField } from "./fields/wine/wine-crud-field";
import { WineGrapeVarietiesField } from "./fields/wine/wine-grape-varieties-field";
import { WineNumberField } from "./fields/wine/wine-number-field";
import { WineSelectRawMaterialsField } from "./fields/wine/wine-select-raw-materials-field";
import { WineTextField } from "./fields/wine/wine-text-field";
import { WineTypeAndSweetnessField } from "./fields/wine/wine-type-and-sweetness-field";
import { WineSelectStringField } from "./fields/wine/wine-select-string-field";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

/*
 * Wine Form, with autosave every 20 sends and autosave onBlur event on each form field
 */

export interface WineFormProps {
  wine: Wine;
}

export const WineForm = ({ wine }: WineFormProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();
  const { winery } = useWinery();
  const { countries, wineTypes, volumes } = useSystemVariables();
  const form = useForm<z.infer<typeof wineFormSchema>>({
    mode: winery?.settings?.autosave ? "onChange" : "onSubmit",
    resolver: zodResolver(wineFormSchema),
  });
  // const form = useFormContext();
  const router = useRouter();
  const { device } = useResponsiveSize();
  const { selectedWineType, selectedSweetness } = useExtraValidations(form);

  const { kj } = useKjAndKcal(
    parseFloat(wine.generalInfo.volume),
    parseFloat(wine.ingredients.sugar),
    parseFloat(wine.ingredients.alcoholByVolume),
  );

  // * STATES
  const [progress, setProgress] = useState<number>(0);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // * REFS
  const mountRef = useRef<boolean>(false);

  // * HANDLERS

  const updateWineInDatabase = useCallback(
    (data: z.infer<typeof wineFormSchema>, status?: string) => {
      setSaving(true);

      // * UPDATE WINE
      // * Make sure to include the image's url
      // data.generalInfo.image = imageUrl;
      data.qrCode = qrCodeUrl;

      data.nutritionalInfo.carbohydrates =
        data.nutritionalInfo.carbohydrates === ""
          ? data.ingredients.sugar
          : data.nutritionalInfo.carbohydrates;

      console.log(
        "ERRORS",
        form.formState.errors,
        isEmpty(form.formState.errors),
      );
      if (!user?.uid) return;
      db.wine
        .update(user?.uid, wine.id, {
          status: status || wine.status,
          lastUpdated: Timestamp.fromDate(new Date()),
          generalInfo: data.generalInfo,
          profile: data.profile,
          ingredients: data.ingredients,
          nutritionalInfo: data.nutritionalInfo,
          isReadyToPublish: isEmpty(form.formState.errors),
        })
        .then((res: DbResponse) => {
          setSaving(false);

          if (winery && !winery.settings?.autosave) {
            toast({
              title: t("toasts.wines.wineSaved.title"),
              description: t("toasts.wines.wineSaved.description"),
            });
          }
        })
        .catch((error: DbResponse) => {
          console.log(error);
          setSaving(false);
        });
    },
    [qrCodeUrl, user?.uid, wine.id, wine.status, form.formState.errors, winery],
  );

  // * Submit form data to firestore
  const onSubmit = useCallback(
    (data: z.infer<typeof wineFormSchema>) => {
      updateWineInDatabase(data);
    },
    [updateWineInDatabase],
  );

  // * Upload image to storage and url to DB + update form with url data
  const handleImageUpload = (image: File) => {
    if (!user?.uid) return;
    console.log("image", image);
    setImageUploading(true);
    storage.winery
      .upload(
        image,
        `wineries/${user?.uid}/wines/${wine.id}/`,
        (progress: any) => {
          setProgress(progress);
        },
        (error: any) => {
          console.log(error);
          setImageUploading(false);
        },
        (url: any) => {
          setImageUrl(() => url);
          form.setValue("generalInfo.image", url);
          onSubmit({
            ...(form.getValues() as z.infer<typeof wineFormSchema>),
            generalInfo: { ...form.getValues().generalInfo, image: url },
          });
          setImageUploading(false);
        },
      )
      .then(() => {
        // console.log("Uploaded");
      })
      .catch((error: any) => console.log(error));
  };

  const accept = {
    "image/*": [],
  };

  // * Image dropping over field
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert("Selected image is too large!");
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setSelectedFile(URL.createObjectURL(file));
    setDialogOpen(true);
  }, []);

  // * Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  // * Handle cropped image
  const handleCroppedImage = (croppedImage: string) => {
    const croppedImageFile = base64ToImageFile(croppedImage, "test.png");
    handleImageUpload(croppedImageFile);
  };

  const handlePreview = () => {
    router.push(`/dashboard/my-wines/preview-wine/${wine?.id}`);
  };

  // * on mount autopopulate form with DB data
  useEffect(() => {
    if (!mountRef.current && wine) {
      mountRef.current = true;
      setImageUrl(wine.generalInfo.image || "");
      setQrCodeUrl(wine.qrCode || "");
      // * autopopulate form by reseting it with wine values from DB
      form.reset(wine as any);
      // console.log("autopopulated", wine);
      form.setValue(
        "generalInfo.wineryName",
        wine.generalInfo.wineryName || winery?.info?.name || "",
      );
      form.trigger();
    }
  }, [wine]);

  // * Calculate KJ
  useEffect(() => {
    if (kj) {
      form.setValue("nutritionalInfo.energy", kj.toString());
    }
  }, [kj]);

  // * Autosave
  const { autosaveCount } = useAutosave(
    () => {
      if (winery && winery.settings?.autosave)
        onSubmit(form.getValues() as z.infer<typeof wineFormSchema>);
    },
    30,
    [],
  );

  useEffect(() => {
    if (winery) {
      console.log(winery.settings?.autosave);
    }
  }, [winery]);

  return (
    <>
      <h2 className="text-xl font-semibold">
        {t("wineStepper.wineryDetails.generalInformation.title")}
      </h2>
      {/* * AVATAR */}
      <Card className="flex w-full flex-col items-start justify-start rounded-[8px] shadow-none">
        <CardHeader className="w-full">
          <div
            className={cn(
              device === "mobile"
                ? "flex flex-col items-center justify-center gap-4"
                : "flex items-center justify-between",
            )}
          >
            <div
              className={cn(
                device === "mobile"
                  ? "flex flex-col items-center justify-center gap-4"
                  : "flex h-full w-full items-center gap-4",
              )}
            >
              {imageUrl && (
                <>
                  {selectedFile && (
                    <ImageCropper
                      dialogOpen={isDialogOpen}
                      setDialogOpen={setDialogOpen}
                      selectedFile={selectedFile}
                      setSelectedFile={setSelectedFile}
                      onCroppedImage={(croppedImage: string) => {
                        handleCroppedImage(croppedImage);
                      }}
                    />
                  )}
                  {/* <Avatar
                    {...getRootProps()}
                    className="size-24 cursor-pointer ring-2 ring-slate-200 ring-offset-2"
                  >
                    <input {...getInputProps()} />
                    <AvatarImage src={imageUrl} alt="Winery Avatar" />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar> */}
                  <div
                    {...getRootProps()}
                    className="size-24 max-h-24 max-w-24 cursor-pointer overflow-hidden rounded-md ring-2 ring-slate-200 ring-offset-2"
                  >
                    <input {...getInputProps()} />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt=""
                        className="size-24 rounded-md transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-95"
                      />
                    )}
                  </div>
                </>
              )}
              <div
                className={cn(
                  device === "mobile"
                    ? "flex flex-col items-center justify-center gap-1"
                    : "space-y-1",
                )}
              >
                <CardTitle className="text-xl">
                  {t(
                    "wineStepper.wineryDetails.generalInformation.avatar.label",
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t(
                    "wineStepper.wineryDetails.generalInformation.avatar.description",
                  )}
                </CardDescription>
                <CardDescription className="text-sm">
                  {t(
                    "wineStepper.wineryDetails.generalInformation.avatar.instructions",
                  )}
                </CardDescription>
              </div>
            </div>
            <QRCodeDialog url={qrCodeUrl} />
          </div>
        </CardHeader>
        {imageUploading && (
          <CardFooter className="w-full">
            <Progress value={progress} />
          </CardFooter>
        )}
      </Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as any)}>
          <div
            className={cn(
              device === "desktop"
                ? "grid w-full grid-cols-2 gap-6"
                : "flex w-full flex-col items-start justify-start gap-6",
            )}
          >
            {/* * WINERY NAME */}
            <WineTextField
              name="generalInfo.wineryName"
              label={t(
                "wineStepper.wineryDetails.generalInformation.wineryName.label",
              )}
              placeholder={t(
                "wineStepper.wineryDetails.generalInformation.wineryName.placeholder",
              )}
              description={t(
                "wineStepper.wineryDetails.generalInformation.wineryName.description",
              )}
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * COLLECTION NAME */}
            <WineTextField
              name="generalInfo.collectionName"
              label={t(
                "wineStepper.wineryDetails.generalInformation.collectionName.label",
              )}
              placeholder={t(
                "wineStepper.wineryDetails.generalInformation.collectionName.placeholder",
              )}
              description={t(
                "wineStepper.wineryDetails.generalInformation.collectionName.description",
              )}
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />

            {/* * VOLUME */}
            <WineSelectStringField
              name="generalInfo.volume"
              label={t(
                "wineStepper.wineryDetails.generalInformation.volume.label",
              )}
              placeholder={t(
                "wineStepper.wineryDetails.generalInformation.volume.placeholder",
              )}
              description={t(
                "wineStepper.wineryDetails.generalInformation.volume.description",
              )}
              form={form}
              options={volumes}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * TYPE OF WINE & SWEETNESS */}
            <WineTypeAndSweetnessField
              form={form}
              selectedWineType={selectedWineType}
              wineTypes={wineTypes}
              selectedSweetness={selectedSweetness}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* *GRAPE VARIETIES */}
            <WineGrapeVarietiesField
              form={form}
              name="generalInfo.grapeVarieties"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * CONTROLLED DESIGNATION OF ORIGIN */}
            <WineTextField
              name="generalInfo.cdo"
              label={t(
                "wineStepper.wineryDetails.generalInformation.cdo.label",
              )}
              placeholder={t(
                "wineStepper.wineryDetails.generalInformation.cdo.placeholder",
              )}
              description={t(
                "wineStepper.wineryDetails.generalInformation.cdo.description",
              )}
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave || true}
            />
            {/* * COUNTRY */}
            <WineSelectStringField
              name="generalInfo.country"
              label={t(
                "wineStepper.wineryDetails.generalInformation.countries.label",
              )}
              placeholder={t(
                "wineStepper.wineryDetails.generalInformation.countries.placeholder",
              )}
              description={t(
                "wineStepper.wineryDetails.generalInformation.countries.description",
              )}
              options={countries}
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * COLLECTION SIZE */}
            <WineNumberField
              name="generalInfo.collectionSize"
              label={t(
                "wineStepper.wineryDetails.generalInformation.collectionSize.label",
              )}
              description={t(
                "wineStepper.wineryDetails.generalInformation.collectionSize.description",
              )}
              form={form}
              min={0}
              step={1}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            <div />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            {t("wineStepper.wineryDetails.ingredients.title")}
          </h2>

          <div
            className={cn(
              device === "desktop"
                ? "mt-6 grid w-full grid-cols-2 gap-6"
                : "mt-6 flex flex-col items-start justify-start gap-6",
            )}
          >
            {/* * RAW MATERIAL */}
            <WineSelectRawMaterialsField
              name={"ingredients.rawMaterial"}
              onSubmit={onSubmit}
              form={form}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * ALCOHOL BY VOLUME */}
            <WineNumberField
              name="ingredients.alcoholByVolume"
              label={t(
                "wineStepper.wineryDetails.ingredients.alcoholbyVolume.label",
              )}
              description={t(
                "wineStepper.wineryDetails.ingredients.alcoholbyVolume.description",
              )}
              form={form}
              min={0}
              step={0.1}
              max={100}
              complementaryText="%"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />

            {/* * SUGAR */}
            <WineNumberField
              name="ingredients.sugar"
              label={t("wineStepper.wineryDetails.ingredients.sugar.label")}
              description={t(
                "wineStepper.wineryDetails.ingredients.sugar.description",
              )}
              form={form}
              min={0}
              step={0.1}
              complementaryText="g/L"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />

            {/* * ACIDITY REGULATORS */}
            <WineCrudField
              name="ingredients.acidityRegulators"
              label={t(
                "wineStepper.wineryDetails.ingredients.acidityRegulators.label",
              )}
              description={t(
                "wineStepper.wineryDetails.ingredients.acidityRegulators.description",
              )}
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * STABILIZERS */}
            <WineCrudField
              name="ingredients.stabilizers"
              label={t(
                "wineStepper.wineryDetails.ingredients.stabilizers.label",
              )}
              description={t(
                "wineStepper.wineryDetails.ingredients.stabilizers.description",
              )}
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * FINING AGENTS */}
            <WineCrudField
              name="ingredients.finingAgents"
              label={t(
                "wineStepper.wineryDetails.ingredients.finingAgents.label",
              )}
              description={t(
                "wineStepper.wineryDetails.ingredients.finingAgents.description",
              )}
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * ANTIOXIDANTS */}
            <WineCrudField
              name="ingredients.antioxidants"
              label={t(
                "wineStepper.wineryDetails.ingredients.antioxidants.label",
              )}
              description={t(
                "wineStepper.wineryDetails.ingredients.antioxidants.description",
              )}
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            {t("wineStepper.wineryDetails.nutritionalInformation.title")}
          </h2>

          <div
            className={cn(
              device === "desktop"
                ? "mt-6 grid w-full grid-cols-2 gap-6"
                : "mt-6 flex flex-col items-start justify-start gap-6",
            )}
          >
            {/* * ENERGY */}
            <WineNumberField
              name="nutritionalInfo.energy"
              label={t(
                "wineStepper.wineryDetails.nutritionalInformation.energy.label",
              )}
              description={t(
                "wineStepper.wineryDetails.nutritionalInformation.energy.description",
              )}
              form={form}
              readOnly={true}
              complementaryText="kj"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * FAT */}
            <WineNumberField
              name="nutritionalInfo.fat"
              label={t(
                "wineStepper.wineryDetails.nutritionalInformation.fat.label",
              )}
              description={t(
                "wineStepper.wineryDetails.nutritionalInformation.fat.description",
              )}
              form={form}
              complementaryText="g/L"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * CARBOHYDRATES */}
            <WineCarbohydratesField
              name="nutritionalInfo.carbohydrates"
              label={t(
                "wineStepper.wineryDetails.nutritionalInformation.carbohydrates.label",
              )}
              description={t(
                "wineStepper.wineryDetails.nutritionalInformation.carbohydrates.description",
              )}
              form={form}
              step={0.1}
              complementaryText="g/L"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * PROTEIN */}
            <WineNumberField
              name="nutritionalInfo.protein"
              label={t(
                "wineStepper.wineryDetails.nutritionalInformation.protein.label",
              )}
              description={t(
                "wineStepper.wineryDetails.nutritionalInformation.protein.description",
              )}
              form={form}
              min={0}
              step={0.1}
              complementaryText="g/L"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * SALT */}
            <WineNumberField
              name="nutritionalInfo.salt"
              label={t(
                "wineStepper.wineryDetails.nutritionalInformation.salt.label",
              )}
              description={t(
                "wineStepper.wineryDetails.nutritionalInformation.salt.description",
              )}
              form={form}
              min={0}
              step={0.1}
              complementaryText="g/L"
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
          </div>
          {/* *SUBMIT BUTTON */}
          <div className="mt-6 w-full space-y-4">
            <Separator className="w-full" />
            {!winery?.settings?.autosave ? (
              <div className="flex w-full items-center justify-end gap-4">
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  onClick={() => onSubmit(form.getValues())}
                >
                  {saving ? (
                    <LoaderCircle
                      size={16}
                      className="animate-spin text-primary-foreground"
                    />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  device === "mobile"
                    ? "flex flex-col items-center justify-center gap-4"
                    : "flex w-full items-center justify-between gap-4",
                )}
              >
                <div className="flex min-w-fit items-center gap-2">
                  <div className="flex min-w-fit items-center gap-2">
                    <Save size={16} className="text-primary" />
                    <p className="text-xs font-medium text-muted-foreground">
                      {t("wineStepper.autosave.enabledText")}
                    </p>
                  </div>
                  <div className="flex min-w-[114px] items-center justify-center">
                    {saving ? (
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-xs text-muted-foreground">Saving</p>
                        <LoaderCircle
                          size={16}
                          className="animate-spin text-primary"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-4">
                        <p className="text-xs text-muted-foreground">
                          {`${t("wineStepper.autosave.savingInText")} ${autosaveCount.toString().padStart(2, "0")}
                          ${t("wineStepper.autosave.secondsText")}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
