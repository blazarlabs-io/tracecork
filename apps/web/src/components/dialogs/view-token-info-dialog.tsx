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
import { Input } from "@repo/ui/components/ui/input";
import { Separator } from "@repo/ui/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/material-light";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { useTokenizer } from "~/src/context/tokenizer";

SyntaxHighlighter.registerLanguage("jsx", jsx);

export type ViewTokenInfoDialogProps = {
  batch: any;
  batchDetails: any;
  children: React.ReactNode;
};

export const ViewTokenInfoDialog = ({
  batch,
  batchDetails,
  children,
}: ViewTokenInfoDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { tokenizeBottle } = useTokenizer();

  const handleSubmitTokenize = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    console.log("BATCH", batchDetails);
    // * tokenize wine bottle(s) if quantity is > 0
    if (quantity > 0) {
      const newBottle = {
        bottle_batch_id: batch.tokenRefId,
        bottle_data: batchDetails.batch_data,
        bottle_meta: batchDetails.batch_meta,
      };

      tokenizeBottle(newBottle, (data: any) => {
        console.log("TOKENIZE BOTTLE RESULT", data);
      });
    }
  };

  // useEffect(() => {
  //   if (batchDetails) {
  //     const splitted = batchDetails.batch_meta.description.split("ipfs://");
  //     setThumbnail(`https://ipfs.io/ipfs/${splitted[1]}`);
  //   }
  // }, [batchDetails]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger className="border rounded-md border-input p-2 bg-foreground text-background">
              {children}
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="max-w-[224px]">
            <p>See batch metadata and mint individual bottle tokens.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-[640px]">
        <DialogHeader className="flex items-start justify-start w-full">
          <div className="flex flex-row items-start justify-start gap-4 w-full">
            {thumbnail && (
              <img src={thumbnail} className="mb-4 size-32 rounded-md" />
            )}
            <div className="flex flex-col items-start justify-start gap-2">
              <DialogTitle className="">
                {batchDetails.batch_meta.name} Token
              </DialogTitle>
              <DialogDescription className="">
                {batchDetails.batch_meta.image}
              </DialogDescription>
              <div className="py-4 flex flex-col items-end justify-center">
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_CARDANO_EXPLORER_URL}${batch.tokenRefId}`}
                  className="underline text-sm"
                >
                  View on explorer
                </Link>
              </div>
            </div>
          </div>

          <SyntaxHighlighter
            language="jsx"
            style={prism}
            codeTagProps={{
              className: "language-jsx",
            }}
            className="max-w-[calc(640px-48px)] min-w-[calc(640px-48px)] max-h-[224px] text-xs rounded-md"
          >
            {JSON.stringify(batchDetails, null, 2)}
          </SyntaxHighlighter>
          <div className="flex flex-col items-start justify-start gap-8 pt-4 w-full">
            <div className="flex flex-col items-start justify-start gap-0 w-full">
              <p className="text-lg font-bold">
                Tokenize Bottles in Batch/Collection
              </p>
              <p className="text-sm text-muted-foreground">
                Use the following section to tokenize individual bottles fo this
                collection.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                <div className="flex flex-col items-start justify-center px-4 py-2 border rounded-md">
                  <p className="text-sm text-muted-foreground font-medium">
                    Collection Size
                  </p>
                  <p>{batchDetails.batch_quantity[0]}</p>
                </div>
                <div className="flex flex-col items-start justify-center px-4 py-2 border rounded-md">
                  <p className="text-sm text-muted-foreground font-medium">
                    Minted
                  </p>
                  <p>
                    {batchDetails.batch_quantity[0] -
                      batchDetails.batch_quantity[1]}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-center px-4 py-2 border rounded-md">
                  <p className="text-sm text-muted-foreground font-medium">
                    Available
                  </p>
                  <p>{batchDetails.batch_quantity[1]}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-4 w-full">
              <p className="text-sm text-muted-foreground">
                Use the following section to tokenize individual bottles fo this
                collection.
              </p>
              <div className="w-full">
                <form
                  onSubmit={handleSubmitTokenize}
                  className="flex items-center gap-2 w-full"
                >
                  <Input
                    value={quantity}
                    type="number"
                    readOnly
                    defaultValue={1}
                    step={1}
                    min={0}
                    max={batchDetails.batch_quantity[1]}
                    className="w-full shadow-none"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <Button variant="outline" type="submit">
                    Tokenize
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator className="mt-6 mb-4" />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="min-w-[64px] mt-4"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
