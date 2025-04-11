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
import { useLottie } from "lottie-react";
import anim from "@/data/anim-4.json";
import { useState } from "react";
import { useTokenizer } from "~/src/context/tokenizer";

export interface TokenizedWineDialogProps {
  children?: React.ReactNode;
}

export const Anim = () => {
  const options = {
    animationData: anim,
    loop: true,
    style: {
      width: "196px",
    },
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export const TokenizedWineDialog = ({ children }: TokenizedWineDialogProps) => {
  const { batch } = useTokenizer();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogTitle></DialogTitle>
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <DialogHeader className="flex flex-col items-center justify-center gap-2">
            <Anim />
            <DialogTitle className="text-center">
              Wine Collection Tokenized
              {/* {t("dashboardGlobalComponents.dialogs.editWineDialog.title")} */}
            </DialogTitle>
            <DialogDescription className="text-center">
              Your wine collection has been successfully tokenized! It is now a
              NFT within the Cardano blockchain, a unique digital asset that can
              be transferred, stored, sold and used in various applications.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end">
            {/* <DialogClose asChild onClick={() => setIsOpen(false)}> */}
            <Button
              type="button"
              variant="default"
              size="lg"
              className="min-w-[64px] mt-4"
              onClick={() => setIsOpen(false)}
            >
              Ok
              {/* {t(
                  "dashboardGlobalComponents.dialogs.editWineDialog.buttons.confirmButtonLabel",
                )} */}
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
