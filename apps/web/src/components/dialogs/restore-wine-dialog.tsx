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

export interface RestoreWineDialogProps {
  uid: string;
  wineId: string;
  collectionName: string;
  children: React.ReactNode;
}

export const RestoreWineDialog = ({
  uid,
  wineId,
  collectionName,
  children,
}: RestoreWineDialogProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();

  const handleRestore = async () => {
    await db.wine.update(uid, wineId, {
      status: "draft",
      publicUrl: "",
    });

    // * TOAST
    toast({
      title: t("toasts.wines.restoreWine.title"),
      description: t("toasts.wines.restoreWine.description", {
        name: collectionName,
      }),
    });

    // * Send email to user
    if (!user?.email) return;
    await sendEmailService({
      toEmail: user.email,
      templateId: emailTemplates["restore-wine"],
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
              <p>{t("myWines.table.rowsActions.5.tooltip")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("dashboardGlobalComponents.dialogs.restoreWineDialog.title")}
          </DialogTitle>
          <DialogDescription>
            <MarkdownPreviewer
              content={t(
                "dashboardGlobalComponents.dialogs.restoreWineDialog.description",
              )}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              {t(
                "dashboardGlobalComponents.dialogs.restoreWineDialog.buttons.cancelButtonLabel",
              )}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleRestore}>
              {t(
                "dashboardGlobalComponents.dialogs.restoreWineDialog.buttons.confirmButtonLabel",
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
