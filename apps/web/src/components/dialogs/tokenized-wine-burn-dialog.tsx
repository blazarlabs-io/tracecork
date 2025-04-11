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
import anim from "@/data/fire.json";
import { useState } from "react";
import { useTokenizer } from "~/src/context/tokenizer";

export interface TokenizedWineBurnDialogProps {
  children?: React.ReactNode;
}

export const Anim = () => {
  const options = {
    animationData: anim,
    loop: true,
    style: {
      width: "124px",
    },
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export const TokenizedWineBurnDialog = ({
  children,
}: TokenizedWineBurnDialogProps) => {
  const { batch } = useTokenizer();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <DialogHeader className="flex flex-col items-center justify-center gap-2">
            <Anim />
            <DialogTitle className="text-center">
              Collection Token Burned
              {/* {t("dashboardGlobalComponents.dialogs.editWineDialog.title")} */}
            </DialogTitle>
            <DialogDescription className="text-center">
              Your wine collection has been successfully burned! It is no longer
              a NFT within the Cardano blockchain and therefore not traceable.
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
