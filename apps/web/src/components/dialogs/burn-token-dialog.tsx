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
import { useEffect, useState } from "react";
import { useTokenizer } from "~/src/context/tokenizer";
import { db } from "~/src/lib/firebase/services/db";
import { Wine } from "~/src/types/db";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { useAuth } from "~/src/context/auth";

export type BurnTokenDialogProps = {
  batchId: string;
  batchDetails: any;
  wine: Wine;
  children: React.ReactNode;
};

export const BurnTokenDialog = ({
  batchId,
  batchDetails,
  wine,
  children,
}: BurnTokenDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useAuth();
  const { burnBatchToken, startStatusMonitor, stopStatusMonitor } =
    useTokenizer();

  const handleBurn = async () => {
    setOpen(false);
    burnBatchToken(batchId, async (data: any) => {
      console.log("BUUUURRRNNNNNNNNN", data);
      //   updateBatch(data);

      // * We start the tokenization status monitor
      startStatusMonitor(
        data.txId,
        user?.uid as string,
        wine.id,
        (res: any) => {
          console.log("MAESTRO RES in callback", res);
          // * We update the database with the latest TX ID
          db.wine
            .update(user?.uid as string, wine.id, {
              tokenization: {
                isTokenized: false,
                tokenRefId: "",
                txId: "",
              },
            })
            .then(() => {
              console.log("TOKENIZE DONE && DB UPDATED");
              stopStatusMonitor();
            })
            .catch((error) => {
              console.log("TOKENIZE DONE && DB UPDATED ERROR");
              console.log(error);
            });
        },
        (error: any) => {
          console.log("MAESTRO ERROR", error);
        },
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger className="border rounded-md border-input p-2 bg-destructive/30">
              {children}
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="max-w-[224px]">
            <p>
              Burn your token and permanently delete it from the Cardano
              blockchain.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-[640px]">
        <DialogHeader className="flex items-start justify-start">
          <div className="flex flex-row items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <DialogTitle className="">
                Burn {batchDetails.batch_meta.name} Token
              </DialogTitle>
              <DialogDescription className="">
                This action cannot be undone. If you continue, your token will
                be permanently deleted from the cardano blockchain.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          {/* <DialogClose asChild> */}
          <Button
            onClick={handleBurn}
            type="button"
            variant="destructive"
            size="lg"
            className="min-w-[64px] mt-4"
          >
            Burn
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
