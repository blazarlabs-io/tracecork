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
import { useRouter } from "next/navigation";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface QrCodeQuotaExceededDialogProps {
  children: React.ReactNode;
  onAction?: (state: string) => void;
}

export const QrCodeQuaotaExceededDialog = ({
  children,
  onAction = () => {},
}: QrCodeQuotaExceededDialogProps) => {
  const { t } = useTranslationHandler();
  const router = useRouter();

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
              {t(
                "dashboardGlobalComponents.dialogs.qrCodeQuotaExceededDialog.title",
              )}
            </DialogTitle>
            <DialogDescription>
              <span>
                {`${t("dashboardGlobalComponents.dialogs.qrCodeQuotaExceededDialog.title")} `}
                <span
                  onClick={() => {
                    router.push("/pricing");
                    if (onAction) onAction("QrCodeQuaotaExceededDialog");
                  }}
                  className="cursor-pointer font-bold text-primary underline"
                >
                  {`${t("dashboardGlobalComponents.dialogs.qrCodeQuotaExceededDialog.upgradeActionLabel")} `}
                </span>
                {`${t("dashboardGlobalComponents.dialogs.qrCodeQuotaExceededDialog.description2")} `}
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild></DialogClose>
            <DialogClose asChild>
              <span className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-6 text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/80">
                {`${t("dashboardGlobalComponents.dialogs.qrCodeQuotaExceededDialog.buttons.cancelButtonLabel")} `}
              </span>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
