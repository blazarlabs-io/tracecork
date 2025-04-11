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

export interface DeleteWineDialogProps {
  uid: string;
  wineId: string;
  collectionName: string;
  children: React.ReactNode;
}

export const DeleteWineDialog = ({
  uid,
  wineId,
  collectionName,
  children,
}: DeleteWineDialogProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();

  const handleDelete = async () => {
    // await db.wine.delete(row.original.uid, row.original.id);
    await db.wine.update(uid, wineId, {
      status: "archived",
      publicUrl: "",
    });

    // * TOAST
    toast({
      title: t("toasts.wines.archivedWine.title"),
      description: t("toasts.wines.archivedWine.description", {
        name: collectionName,
      }),
    });

    // * Send email to user
    if (!user?.email) return;
    await sendEmailService({
      toEmail: user.email,
      templateId: emailTemplates["archive-wine"],
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
              <p>{t("myWines.table.rowsActions.4.tooltip")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("dashboardGlobalComponents.dialogs.deleteWineDialog.title")}
          </DialogTitle>
          <DialogDescription>
            <MarkdownPreviewer
              content={t(
                "dashboardGlobalComponents.dialogs.deleteWineDialog.description",
              )}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              {t(
                "dashboardGlobalComponents.dialogs.deleteWineDialog.buttons.cancelButtonLabel",
              )}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={handleDelete}>
              {t(
                "dashboardGlobalComponents.dialogs.deleteWineDialog.buttons.confirmButtonLabel",
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
