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
import { toast } from "@repo/ui/hooks/use-toast";
import { db } from "@/lib/firebase/services/db";
import { useRouter } from "next/navigation";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";

export interface EditWineDialogProps {
  uid: string;
  wineId: string;
  collectionName: string;
  status?: string;
  children: React.ReactNode;
}

export const EditWineDialog = ({
  uid,
  wineId,
  collectionName,
  status = "published",
  children,
}: EditWineDialogProps) => {
  const { t } = useTranslationHandler();
  const router = useRouter();

  const handleUnpublish = async () => {
    await db.wine.update(uid, wineId, {
      status: "draft",
      publicUrl: `/explore/wine/${wineId}`,
    });

    router.push(`/dashboard/my-wines/editor/${wineId}`);

    // * TOAST
    toast({
      title: t("toasts.wines.unpublishWine.title"),
      description: t("toasts.wines.unpublishWine.description", {
        name: collectionName,
      }),
    });
  };

  const handleEdit = async () => {
    if (status === "draft") {
      // router.push(`/dashboard/my-wines/wine-editor/${wineId}`);
      router.push(`/dashboard/my-wines/editor/${wineId}`);
    }
  };

  return (
    <>
      {status === "published" ? (
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
                  <p>{t("myWines.table.rowsActions.0.tooltip")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {t("dashboardGlobalComponents.dialogs.editWineDialog.title")}
              </DialogTitle>
              <DialogDescription>
                {/* By confirming, your wine will be first{" "}
                <span className="font-bold">unpublished</span>. Then you can
                edit it as a <span className="font-bold">draft</span>. Please
                remember to publish your wine again once you are ready.
                Mark */}
                <MarkdownPreviewer
                  content={t(
                    "dashboardGlobalComponents.dialogs.editWineDialog.description",
                  )}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  {t(
                    "dashboardGlobalComponents.dialogs.editWineDialog.buttons.cancelButtonLabel",
                  )}
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="default"
                  onClick={handleUnpublish}
                >
                  {t(
                    "dashboardGlobalComponents.dialogs.editWineDialog.buttons.confirmButtonLabel",
                  )}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <button
          onClick={handleEdit}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-background"
        >
          {children}
        </button>
      )}
    </>
  );
};
