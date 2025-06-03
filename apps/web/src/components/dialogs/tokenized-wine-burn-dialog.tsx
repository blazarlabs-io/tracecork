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
import { useEffect, useRef, useState } from "react";
import { useTokenizer } from "~/src/context/tokenizer";
import { useAuth } from "~/src/context/auth";

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
  const mountRef = useRef<boolean>(false);
  const router = useRouter();
  const { user } = useAuth();
  const { wineId, updateAction } = useTokenizer();

  const handleClose = () => {
    setIsOpen(false);
    updateAction(null);
  };

  useEffect(() => {
    if (!mountRef.current && user && wineId) {
      mountRef.current = true;
      db.wine
        .update(user.uid as string, wineId, {
          tokenization: {
            isTokenized: false,
          },
        })
        .then(() => {
          // console.log("Tokenization done and data updated in DB");
          // updateAction(null);
        })
        .catch((error) => {
          console.error("Tokenization error, could not update DB", error);
        });
    }
  }, [user, wineId]);
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
              onClick={handleClose}
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
