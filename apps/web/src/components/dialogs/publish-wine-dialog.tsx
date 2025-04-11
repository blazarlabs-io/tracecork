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
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface PublishWineDialogProps {
  uid: string;
  wineId: string;
  collectionName: string;
  children: React.ReactNode;
}

export const PublishWineDialog = ({
  uid,
  wineId,
  collectionName,
  children,
}: PublishWineDialogProps) => {
  const { t } = useTranslationHandler();

  const handlePublish = async () => {
    await db.wine.update(uid, wineId, {
      status: "published",
      publicUrl: `/explore/wine/${wineId}`,
    });
    // * TOAST
    toast({
      title: t("toasts.wines.publishWine.title"),
      description: t("toasts.wines.publishWine.description", {
        name: collectionName,
      }),
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
              <p>Publish wine</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Wine</DialogTitle>
          <DialogDescription>
            By confirming, you accept to make public your registered wine,
            following all{" "}
            <span className="italic">EU Wine Labeling Regulations</span>. Your
            wine will be accessible by scanning our{" "}
            <span className="font-bold">Tracecork</span> generated QR code or by
            using our public and free wine explorer APP.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={handlePublish}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
