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
import MarkdownPreviewer from "../../markdown-previewer/MarkdownPreviewer";
import "./missing-fields-dialog.css";

export interface MissingFieldsDialogProps {
  children: React.ReactNode;
  wineId: string;
  onAction?: (state: string) => void;
}

export const MissingFieldsDialog = ({
  children,
  wineId,
  onAction = () => {},
}: MissingFieldsDialogProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const router = useRouter();

  // * HANDLE EDIT WINE
  const handleEdit = () => {
    router.push(`/dashboard/my-wines/editor/${wineId}`);
    if (onAction) onAction("MissingFieldsDialog");
  };

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
                <p>{t("myWines.table.rowsActions.1.tooltip") || ""}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t(
                "dashboardGlobalComponents.dialogs.missingFieldsDialog.title",
              ) || ""}
            </DialogTitle>
            <DialogDescription>
              <span className="description-container">
                <MarkdownPreviewer
                  content={
                    t(
                      "dashboardGlobalComponents.dialogs.missingFieldsDialog.description",
                    ) || ""
                  }
                />
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild onClick={handleEdit}>
              <span className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-6 text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/80">
                {t(
                  "dashboardGlobalComponents.dialogs.missingFieldsDialog.buttons.cancelButtonLabel",
                ) || ""}
              </span>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
