import { LoaderCircle } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@repo/ui/components/ui/dialog";
import { toast } from "@repo/ui/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import "./upgrade-plan-dialog-styles.css";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import { sendEmailService } from "@/services/email-services";
import { emailTemplates } from "@/utils/email-templates";
import { NEXT_PUBLIC_TRACECORK_EMAIL } from "@/utils/envConstants";

export const UpgradePlanDialog = () => {
  const { t } = useTranslationHandler();
  // * HOOKS
  const { user } = useAuth();

  // * STATES
  const [sending, setSending] = useState<boolean>(false);

  // * METHODS
  const handlePlanUpgradeRequest = async () => {
    try {
      setSending(true);
      if (!user?.email) return;
      const toEmail = NEXT_PUBLIC_TRACECORK_EMAIL;
      if (!toEmail) return;
      // Send email
      await sendEmailService({
        toEmail: toEmail,
        templateId: emailTemplates["upgrade-request"],
        dynamicTemplateData: {
          userEmail: user.email,
        },
      });
      toast({
        title: t("toasts.userSettings.upgradeRequestSent.title"),
        description: t("toasts.userSettings.upgradeRequestSent.description"),
      });
    } catch (error) {
      console.error(error);
      setSending(false);
      toast({
        variant: "destructive",
        title: t("toasts.globals.somethingWentWrong.title"),
        description: t("toasts.globals.somethingWentWrong.description"),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {user && (
        <Dialog>
          <DialogTitle></DialogTitle>
          <DialogTrigger className="max-w-fit rounded-full bg-gradient-to-br from-primary to-[#AAFF7F] px-4 py-2 text-xs text-foreground">
            {t("dashboardHome.avatarCard.upgradeButtonLabel")}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {t("dashboardGlobalComponents.dialogs.upgradeWineDialog.title")}
              </DialogTitle>
              <DialogDescription className="dialgo-description">
                <MarkdownPreviewer
                  content={t(
                    "dashboardGlobalComponents.dialogs.upgradeWineDialog.description",
                  )}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild onClick={handlePlanUpgradeRequest}>
                {sending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Button>
                    {t(
                      "dashboardGlobalComponents.dialogs.upgradeWineDialog.buttons.confirmButtonLabel",
                    )}
                  </Button>
                )}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
