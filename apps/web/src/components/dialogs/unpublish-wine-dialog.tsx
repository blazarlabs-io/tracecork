import { Button } from "@repo/ui/components/ui/button";
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
import { toast } from "@repo/ui/hooks/use-toast";
import { db } from "@/lib/firebase/services/db";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import { sendEmailService } from "@/services/email-services";
import { emailTemplates } from "@/utils/email-templates";

export interface PublishWineDialogProps {
  uid: string;
  wineId: string;
  collectionName: string;
  children: React.ReactNode;
}

export const UnpublishWineDialog = ({
  uid,
  wineId,
  collectionName,
  children,
}: PublishWineDialogProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();

  const handleUnpublish = async () => {
    await db.wine.update(uid, wineId, {
      status: "draft",
      publicUrl: "",
    });

    // * TOAST
    toast({
      title: t("toasts.wines.unpublishWine.title"),
      description: t("toasts.wines.unpublishWine.description", {
        name: collectionName,
      }),
    });

    // * Send email to user
    if (!user?.email) return;
    await sendEmailService({
      toEmail: user.email,
      templateId: emailTemplates["unpublish-wine"],
      dynamicTemplateData: {
        user: (user?.displayName as string) || user?.email,
        wineId: wineId,
      },
    });
  };

  return (
    <Dialog>
      <DialogTitle></DialogTitle>
      <DialogTrigger className="">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger
              asChild
              className="flex h-9 w-9 items-center justify-center rounded-md bg-background"
            >
              {children}
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("myWines.table.rowsActions.2.tooltip")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("dashboardGlobalComponents.dialogs.unpublishWineDialog.title")}
          </DialogTitle>
          <DialogDescription>
            {/* By confirming, you accept to{" "}
            <span className="font-bold">unpublish</span> your wine. Your wine
            will be hidden from our public wine explorer. */}
            <MarkdownPreviewer
              content={t(
                "dashboardGlobalComponents.dialogs.unpublishWineDialog.description",
              )}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              {t(
                "dashboardGlobalComponents.dialogs.unpublishWineDialog.buttons.cancelButtonLabel",
              )}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={handleUnpublish}>
              {t(
                "dashboardGlobalComponents.dialogs.unpublishWineDialog.buttons.confirmButtonLabel",
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
