"use client";

import { Form } from "@repo/ui/components/ui/form";
import { useAuth } from "@/context/auth";
import { useWinery } from "@/context/winery";
import { wineryInfoFormSchema } from "@/data/form-schemas";
import { initialCoordinates } from "@/data/templates";
import { useAutosave } from "@/hooks/use-autosave";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { db } from "@/lib/firebase/services/db";
import { storage } from "@/lib/firebase/services/storage";
import { Coordinates, DbResponse } from "@/types/db";
import { dynamicYears } from "@/utils/dynamic-years";
import { base64ToImageFile } from "@/utils/image-utils";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
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
import { toast } from "@repo/ui/hooks/use-toast";
import { AvatarCropper } from "@/components/widgets/avatar-cropper";
import { WineryCrudField } from "./fields/winery/winery-crud-field";
import { WineryHeadquartersField } from "./fields/winery/winery-headquarters-field";
import { WineryNumberField } from "./fields/winery/winery-number-field";
import { WineryRepresentativeField } from "./fields/winery/winery-representative-field";
import { WinerySelectField } from "./fields/winery/winery-select-field";
import { WineryTextField } from "./fields/winery/winery-text-field";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

/*

* Winery Form, with autosave every 20 sends and autosave onBlur event on each form field

*/

export const WineryForm = () => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();
  const { winery } = useWinery();
  const { device } = useResponsiveSize();
  const form = useForm<z.infer<typeof wineryInfoFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(wineryInfoFormSchema),
  });

  // * STATES
  const [coordinates, setCoordinates] =
    useState<Coordinates>(initialCoordinates);
  const [progress, setProgress] = useState<number>(0);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const accept = {
    "image/*": [],
  };

  // * REFS
  const mountRef = useRef<boolean>(false);

  // * HANDLERS

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  const handleCroppedImage = (croppedImage: string) => {
    const croppedImageFile = base64ToImageFile(croppedImage, "avatar.png");
    setAvatarUrl(croppedImage);
    handleImageUpload(croppedImageFile);
  };

  // * Submit form data to firestore
  const onSubmit = (data: z.infer<typeof wineryInfoFormSchema>) => {
    setSaving(true);

    // * UPDATE WINERY
    db.winery
      .update(user?.uid as string, { info: data })
      .then((res: DbResponse) => {
        setSaving(false);

        if (winery && !winery.settings.autosave) {
          toast({
            title: t("toasts.wines.wineryInfoUpdated.title"),
            description: t("toasts.wines.wineryInfoUpdated.description"),
          });
        }
      })
      .catch((error: DbResponse) => {
        console.log(error);
        setSaving(false);
      });
  };

  // * update form with coordinate changes using interactive map
  const onCoordinatesChange = (position: Coordinates) => {
    setCoordinates(position);
    form.setValue("headquarters.lat", position.lat.toString());
    form.setValue("headquarters.lng", position.lng.toString());
    onSubmit({ ...form.getValues(), headquarters: position });
  };

  // * Upload image to storage and url to DB + update form with url data
  const handleImageUpload = (image: File) => {
    setImageUploading(true);
    storage.winery
      .upload(
        image,
        `wineries/${user?.uid}/avatar/`,
        (progress: any) => {
          setProgress(progress);
        },
        (error: any) => {
          console.log(error);
          setImageUploading(false);
        },
        (url: any) => {
          setAvatarUrl(url);
          form.setValue("avatar", url);
          setImageUploading(false);
          onSubmit({ ...form.getValues(), avatar: url });
        },
      )
      .then(() => {
        // console.log("Uploaded");
      })
      .catch((error: any) => console.log(error));
  };

  // * on mount autopopulate form with DB data
  useEffect(() => {
    if (!mountRef.current && winery) {
      mountRef.current = true;
      console.log("AVATAR", winery.info?.avatar);
      setAvatarUrl(winery.info?.avatar || "");
      form.setValue("avatar", winery.info?.avatar || "");
      form.setValue("name", winery.info?.name || "");
      form.setValue("foundedIn", winery.info?.foundedIn || "");
      form.setValue("wineCollections", winery.info?.wineCollections || "");
      form.setValue("grapeVarieties", winery.info?.grapeVarieties || "");
      form.setValue("bottlesProduced", winery.info?.bottlesProduced || "");
      form.setValue("vineyardsSurface", winery.info?.vineyardsSurface || "");
      form.setValue(
        "certifications",
        (winery.info?.certifications || []).map((certification) => ({
          name: certification.name as string,
        })),
      );
      form.setValue(
        "headquarters",
        winery.info?.headquarters || initialCoordinates,
      );
      form.setValue(
        "representative",
        winery.info?.representative || {
          name: "",
          phone: "",
          email: "",
        },
      );
      setCoordinates(winery.info?.headquarters || initialCoordinates);
    }
  }, [winery]);

  // * Autosave
  const { autosaveCount } = useAutosave(
    () => {
      if (winery?.settings?.autosave) onSubmit(form.getValues());
    },
    30,
    [],
  );

  return (
    <>
      {/* * AVATAR */}
      <Card className="flex w-full flex-col items-start rounded-[8px] shadow-none">
        <CardHeader className="">
          <div className="flex h-full w-full items-center gap-4">
            {avatarUrl && (
              <>
                {selectedFile && (
                  <AvatarCropper
                    dialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    onCroppedImage={(croppedImage: string) => {
                      handleCroppedImage(croppedImage);
                    }}
                  />
                )}
                <Avatar
                  {...getRootProps()}
                  className="relative size-24 cursor-pointer ring-2 ring-slate-200 ring-offset-2"
                >
                  <input {...getInputProps()} />
                  <Upload className="pointer-events-none absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] text-white" />
                  <AvatarImage
                    src={avatarUrl}
                    alt="Winery Avatar"
                    className="relative z-0 transition-all duration-200 ease-in-out hover:scale-105 hover:brightness-75"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-[#86F096] text-primary-foreground"></AvatarFallback>
                </Avatar>
              </>
            )}

            <div className="space-y-1">
              <CardTitle className="text-xl">
                {t("wineryDetails.avatar.label")}
              </CardTitle>
              <CardDescription className="text-sm">
                {t("wineryDetails.avatar.description")}
              </CardDescription>
              <CardDescription className="text-sm">
                {t("wineryDetails.avatar.instructions")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        {imageUploading && (
          <CardFooter className="w-full">
            <Progress value={progress} />
          </CardFooter>
        )}
      </Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={cn(
              device === "mobile"
                ? "flex w-full flex-col items-start justify-start gap-6"
                : "grid w-full grid-cols-2 gap-6",
            )}
          >
            {/* * NAME */}
            <WineryTextField
              name="name"
              form={form}
              label={t("wineryDetails.wineryName.label")}
              description={t("wineryDetails.wineryName.description")}
              onSubmit={onSubmit}
              placeholder={t("wineryDetails.wineryName.placeholder")}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * FOUNDED IN */}
            <WinerySelectField
              name="foundedIn"
              form={form}
              label={t("wineryDetails.foundedIn.label")}
              description={t("wineryDetails.foundedIn.description")}
              onSubmit={onSubmit}
              placeholder={t("wineryDetails.foundedIn.placeholder")}
              options={dynamicYears()
                .reverse()
                .map((year: number) => year)}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * WINE COLLECTIONS */}
            <WineryNumberField
              name="wineCollections"
              form={form}
              label={t("wineryDetails.wineCollections.label")}
              description={t("wineryDetails.wineCollections.description")}
              onSubmit={onSubmit}
              placeholder="0"
              min={0}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* * NUMBER OF BOTTLES */}
            <WineryNumberField
              name="bottlesProduced"
              form={form}
              label={t("wineryDetails.noOfBottlesProduced.label")}
              description={t("wineryDetails.noOfBottlesProduced.description")}
              onSubmit={onSubmit}
              placeholder="0"
              min={0}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* *VINEYARDS SURFACE */}
            <WineryNumberField
              name="vineyardsSurface"
              form={form}
              label={t("wineryDetails.vineyardsSurface.label")}
              description={t("wineryDetails.vineyardsSurface.description")}
              onSubmit={onSubmit}
              min={0}
              placeholder="0"
              complementaryText="Ha"
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* *GRAPE VARIETIES */}
            <WineryNumberField
              name="grapeVarieties"
              form={form}
              label={t("wineryDetails.grapeVarieties.label")}
              description={t("wineryDetails.grapeVarieties.description")}
              onSubmit={onSubmit}
              min={0}
              placeholder="0"
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* *WINERY CERTIFICATIONS */}
            <WineryCrudField
              form={form}
              name="certifications"
              label={t("wineryDetails.certifications.label")}
              description={t("wineryDetails.certifications.description")}
              addButtonLabel={t("wineryDetails.certifications.buttonLabel")}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            <div />
            {/* *HEADQUARTERS */}
            <WineryHeadquartersField
              form={form}
              coordinates={coordinates}
              onCoordinatesChange={onCoordinatesChange}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* *WINERY REPRESENTATIVE */}
            <WineryRepresentativeField
              form={form}
              onSubmit={onSubmit}
              autosave={winery?.settings?.autosave as boolean}
            />
            {/* *SUBMIT BUTTON */}
            <div className="col-span-2 mt-6 w-full space-y-4">
              <Separator className="w-full" />
              {!winery?.settings?.autosave ? (
                <div className="flex w-full items-center justify-end gap-4">
                  <Button disabled={form.formState.isSubmitting} type="submit">
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
                <div className="flex w-full items-center justify-end gap-4">
                  <div className="flex min-w-fit items-center gap-2">
                    <Save size={16} className="text-primary" />
                    <p className="text-xs font-medium text-muted-foreground">
                      Autosave enabled
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
                      <p className="text-xs text-muted-foreground">
                        Saving in {autosaveCount.toString().padStart(2, "0")}{" "}
                        seconds
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
