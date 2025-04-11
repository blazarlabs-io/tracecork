"use client";

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
import { useAuth } from "@/context/auth";
import { useQRCodesLimit } from "@/hooks/use-qr-codes-limit";
import { toast } from "@repo/ui/hooks/use-toast";
import { PageHeader } from "../layouts/page-header";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { cn } from "@/utils/shadcn";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import { NEXT_PUBLIC_TRACECORK_EMAIL } from "@/utils/envConstants";
import { sendEmailService } from "@/services/email-services";
import { emailTemplates } from "@/utils/email-templates";

export const SubscriptionPage = () => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();
  const { qrCodesLimit, qrCodesLeft, planPrice, planName } = useQRCodesLimit();
  const { device } = useResponsiveSize();

  // * HANDLERS
  const handlePlanUpgradeRequest = async () => {
    try {
      // Send email
      const toEmail = NEXT_PUBLIC_TRACECORK_EMAIL;
      // const toEmail = "c.tudorcotruta@gmail.com";
      if (!toEmail) return;
      await sendEmailService({
        toEmail,
        templateId: emailTemplates["upgrade-request"],
        dynamicTemplateData: {
          userEmail: user?.email,
        },
      });
      toast({
        title: t("toasts.userSettings.upgradeRequestSent.title"),
        description: t("toasts.userSettings.upgradeRequestSent.description"),
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: t("toasts.userSettings.somethingWentWrong.title"),
        description: t("toasts.userSettings.somethingWentWrong.description"),
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title={t("subscription.headline")}
        subtitle={t("subscription.subHeadline")}
      />
      <Separator className="w-full" />
      <div
        className={cn(
          "grid w-full",
          device === "mobile" ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        <div className="grid w-full grid-cols-2 gap-x-8 rounded-[8px] border p-6 shadow-none">
          <div className="flex w-full flex-col items-start justify-between gap-8">
            <div className="flex items-center gap-2 pt-2">
              <div className="rounded-[4px] bg-foreground px-[6px] py-[3px]">
                <span className="text-sm capitalize text-background">
                  {planName}
                </span>
              </div>
              <span className="text-sm font-medium">
                {t("subscription.subscriptionCard.planText")}
              </span>
            </div>
            {device === "mobile" ? (
              <div className="flex flex-col items-center justify-center">
                {qrCodesLeft > 0 ? (
                  <span className="text-foreground">
                    {qrCodesLeft} / {qrCodesLimit} labels
                  </span>
                ) : (
                  <span className="text-destructive">
                    {qrCodesLeft} / {qrCodesLimit} labels
                  </span>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {qrCodesLeft > 0 ? (
                  <span className="text-foreground">
                    {`${qrCodesLeft} / ${qrCodesLimit} ${t("subscription.subscriptionCard.labelsRemainingText")}`}
                  </span>
                ) : (
                  <span className="text-destructive">
                    {`${qrCodesLeft} / ${qrCodesLimit} ${t("subscription.subscriptionCard.labelsRemainingText")}`}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end justify-end gap-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-medium">€</span>
              <span className="text-5xl font-bold">{planPrice}</span>
              <span className="text-sm font-medium text-muted-foreground">
                {`/${t("subscription.subscriptionCard.perYearText")}`}
              </span>
            </div>
            <Dialog>
              <DialogTitle></DialogTitle>
              <DialogTrigger className="max-w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                {t("subscription.subscriptionCard.upgradeButtonLabel")}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {t(
                      "dashboardGlobalComponents.dialogs.upgradeWineDialog.title",
                    )}
                  </DialogTitle>
                  <DialogDescription>
                    <MarkdownPreviewer
                      content={t(
                        "dashboardGlobalComponents.dialogs.upgradeWineDialog.description",
                      )}
                    />
                    {/* Upgrade your plan to unlock all features. By clicking{" "}
                    <span className="font-bold">Upgrade</span> you accept to be
                    contacted by our sales team. */}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild onClick={handlePlanUpgradeRequest}>
                    <Button>
                      {t(
                        "dashboardGlobalComponents.dialogs.upgradeWineDialog.buttons.confirmButtonLabel",
                      )}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
