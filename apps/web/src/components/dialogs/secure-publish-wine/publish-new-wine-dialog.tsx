import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { useAuth } from "@/context/auth";
import { dynamicQrCodeTemplate } from "@/data/templates";
import { toast } from "@repo/ui/hooks/use-toast";
import { db } from "@/lib/firebase/services/db";
import { storage } from "@/lib/firebase/services/storage";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { DynamicQrCodeGenerator } from "@/components/widgets/dynamic-qr-code-generator";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

import { SecurePublishWineDialogProps } from "../secure-publish-wine-dialog";
import MarkdownPreviewer from "../../markdown-previewer/MarkdownPreviewer";
import { sendEmailService } from "@/services/email-services";
import { emailTemplates } from "@/utils/email-templates";
import {
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_QR_CODES_URL,
} from "@/utils/envConstants";

export const PublishNewWineDialog = ({
  children,
  uid,
  wineId,
  collectionName,
  onPublish,
  onAction,
}: SecurePublishWineDialogProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const router = useRouter();
  const { user } = useAuth();

  // * STATES
  const [qrCodeImageFile, setQrCodeImageFile] = useState<File | null>(null);

  // * HANDLE QR CODE
  const handleQrCode = useCallback(
    async (qrCodeImageFile: File) => {
      const qrCodeRes = await db.qrCode.getOne(uid, wineId);

      // * Check if wine has QR code already, if not, generate it
      if (!qrCodeRes.data) {
        storage.winery
          .upload(
            qrCodeImageFile,
            `wineries/${uid}/wines/${wineId}/`,
            (progress: any) => {
              // console.log("progress", progress);
            },
            (error: any) => {
              console.log(error);
            },
            async (url: any) => {
              //   setQrCodeUrl(url);
              if (onPublish) onPublish(url);
              //   form.setValue("qrCode", url);
              await db.wine.update(uid, wineId, {
                status: "published",
                publicUrl: `/explore/wine/${wineId}`,
                qrCode: url,
              });

              dynamicQrCodeTemplate.uid = uid as string;
              dynamicQrCodeTemplate.wineId = wineId;
              dynamicQrCodeTemplate.imageUrl = url;
              dynamicQrCodeTemplate.staticUrl = `${NEXT_PUBLIC_QR_CODES_URL}/explore/wine/${wineId}`;
              dynamicQrCodeTemplate.redirectUrl = `${NEXT_PUBLIC_APP_URL}/explore/wine/${wineId}`;

              // * Set dynamic QR code in DB
              await db.qrCode.set(uid, dynamicQrCodeTemplate);

              // * Send email to user
              if (!user?.email) return;
              await sendEmailService({
                toEmail: user?.email,
                templateId: emailTemplates["qr-code-generation"],
                dynamicTemplateData: {
                  user: (user?.displayName as string) || user?.email,
                  wineUrl: dynamicQrCodeTemplate.redirectUrl,
                  qrCodeUrl: dynamicQrCodeTemplate.imageUrl,
                },
              });
            },
          )
          .then(() => {
            // console.log("Uploaded");
          })
          .catch((error: any) => console.log(error));
      } else {
        // console.log("QR CODE ALREADY EXISTS");
      }
      router.replace("/dashboard/my-wines");
    },
    [onPublish, router, uid, user?.email, wineId],
  );

  // * HANDLE PUBLISH WINE
  const handlePublish = useCallback(async () => {
    await db.wine.update(uid, wineId, {
      status: "published",
      publicUrl: `/explore/wine/${wineId}`,
    });

    // if (onPublish) await onPublish(qrCodeImageFile as File);
    await handleQrCode(qrCodeImageFile as File);

    if (typeof window !== "undefined") {
      window.open("/explore/wine/" + wineId, "_blank");
    }

    // * TOAST
    toast({
      title: t("toasts.wines.publishWine.title"),
      description: t("toasts.wines.publishWine.description", {
        name: collectionName,
      }),
    });

    if (onAction) onAction("PublishNewWineDialog");
  }, [uid, wineId, handleQrCode, qrCodeImageFile, collectionName, onAction]);

  return (
    <>
      <Dialog>
        <DialogTrigger className="">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild className="">
                {children}
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("myWines.table.rowsActions.1.tooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("dashboardGlobalComponents.dialogs.publishWineDialog.title")}
            </DialogTitle>
            <DialogDescription>
              <MarkdownPreviewer
                content={t(
                  "dashboardGlobalComponents.dialogs.publishWineDialog.description",
                )}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end">
            <DynamicQrCodeGenerator
              wineId={wineId}
              onGenerated={(file, base64) => {
                setQrCodeImageFile(file);
              }}
            />
            <DialogClose asChild>
              <span className="flex h-10 cursor-pointer items-center justify-center rounded-md px-6 text-foreground transition duration-200 ease-in-out hover:bg-muted">
                {t(
                  "dashboardGlobalComponents.dialogs.publishWineDialog.buttons.cancelButtonLabel",
                )}
              </span>
            </DialogClose>
            <DialogClose asChild onClick={handlePublish}>
              <span className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-6 text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/80">
                {t(
                  "dashboardGlobalComponents.dialogs.publishWineDialog.buttons.confirmButtonLabel",
                )}
              </span>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
