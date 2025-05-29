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
// import { toast } from "@/hooks/use-toast";
// import { db } from "@/lib/firebase/services/db";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { useEffect, useRef, useState } from "react";
import { useTokenizer } from "~/src/context/tokenizer";
import { Wine } from "~/src/types/db";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import { db } from "~/src/lib/firebase/services/db";
import { mDataSample } from "~/src/data/mdata_sample";
import { useUpdateTokenizedInDb } from "~/src/hooks/use-update-tokenized-in-db";
import tk from "~/src/services/logger";

export interface TokenizeWineDialogProps {
  uid: string;
  wine: Wine;
  children: React.ReactNode;
}

export const TokenizeWineDialog = ({
  uid,
  wine,
  children,
}: TokenizeWineDialogProps) => {
  const { t } = useTranslationHandler();
  const { tokenizeBatch, statusMonitor } = useTokenizer();
  const [open, setOpen] = useState<boolean>(false);
  // const mountRef = useRef<boolean>(false);

  const uploadFile = async (imgFile: File) => {
    if (!imgFile) {
      alert("No file selected");
      return;
    }

    const data = new FormData();
    data.append(
      "file",
      imgFile,
      `${uid}-${wine.generalInfo.collectionName}.png`,
    );

    try {
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const res = await uploadRequest.json();
      // const signedUrl = res.url;
      console.log("\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXPINATA", res);
      return res;
    } catch (e) {
      tk.log("Error uploading file", e);
      return null;
    }
  };

  const getImageFileFromUrl = async (imageUrl: string, fileName: string) => {
    try {
      // Fetch the image from the URL
      const response = await fetch(imageUrl);

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      // Get the image as a Blob
      const blob = await response.blob();

      // Create a File object from the Blob
      const file = new File([blob], fileName, { type: blob.type });

      return file;
    } catch (error) {
      tk.error("Error fetching or converting image:", error);
      return null;
    }
  };

  const handleTokenize = async () => {
    setOpen(false);

    const imageFile = await getImageFileFromUrl(
      wine.generalInfo.image,
      `${wine.generalInfo.collectionName.replace(" ", "-").toLocaleLowerCase()}-cover.jpg`,
    );

    // TODO: In order to make pinata work, use the code in the comment bellow <await uploadFile(imageFile as File)>
    const res = await uploadFile(imageFile as File); // "xxx/ipfs/0195b9b2-3fb3-74e0-ace6-53807d2c7014"; //

    tk.log("\n====================================");
    // const splittedUrl = imgUploadRes?.split("/ipfs/");
    const imgIpfs = `ipfs://${res.IpfsHash}`;
    tk.log("imageFile", imageFile);
    // tk.log("imgUploadRes", imgUploadRes);
    // tk.log("splittedUrl", splittedUrl);
    tk.log("imgIpfs", imgIpfs);
    tk.log("====================================\n");

    // TODO: Add collectionSize = 0 error dialog preventing the tokenization if collectionSize is not set properly.

    // * Get storage sensor data
    const storageRes = await fetch("/api/sensors/today", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const storageData = await storageRes.json();

    // * Create new batch object
    const newBatchData = {
      batch_data: {
        info: JSON.stringify(wine),
        mdata: JSON.stringify(storageData.data),
        minscr: "",
      },
      batch_meta: {
        description:
          "This token binds a unique wine collection from tracecork.com on the cardano blockchain.",
        image: imgIpfs, //`ipfs://${imgIpfs}`,
        name: wine?.generalInfo.collectionName,
      },
      batch_quantity: [
        parseInt(wine?.generalInfo.collectionSize as string),
        parseInt(wine?.generalInfo.collectionSize as string),
      ],
    };

    tk.log("newBatchData:", newBatchData);

    tokenizeBatch(newBatchData, async (data: any) => {
      tk.log("\n\n+++++++++++++++++++\n");
      tk.log("newBatchData:", newBatchData);
      tk.log("UID:", uid);
      tk.log("WINE:", wine);
      tk.log("DATA:", data);
      tk.log("tokenRefId:", data.tokenRefId);
      tk.log("txId:", data.txId);
      tk.log("\n+++++++++++++++++++\n\n");
    });
  };

  // useEffect(() => {
  //   if (!mountRef.current && statusMonitor.status === "success") {
  //     // * We update the database with the latest TX ID
  //     console.log("UPDATING DB WITH TOKENIZATION DATA", statusMonitor);
  //     db.wine
  //       .update(uid, wine.id, {
  //         tokenization: {
  //           isTokenized: true,
  //           tokenRefId: statusMonitor.refId,
  //           txId: statusMonitor.txHash,
  //         },
  //       })
  //       .then(() => {
  //         console.log("TOKENIZE DONE && DB UPDATED");
  //       })
  //       .catch((error) => {
  //         console.log("TOKENIZE DONE && DB UPDATED ERROR");
  //         console.log(error);
  //       });
  //     mountRef.current = true;
  //   } else {
  //     mountRef.current = false;
  //   }
  // }, [statusMonitor]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger className="disabled:opacity-50 disabled:hover:cursor-not-allowed">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger
              asChild
              className="flex h-9 w-9 items-center justify-center rounded-md bg-background"
            >
              {children}
            </TooltipTrigger>
            <TooltipContent className="max-w-56">
              <p>
                Batch tokenization for supply chain tracking will be implemented
                soon
                {/* {t("myWines.table.rowsActions.3.tooltip")} */}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("dashboardGlobalComponents.dialogs.tokenizeWineDialog.title")}
          </DialogTitle>
          <DialogDescription>
            {/* By confirming, you accept to tokenize your wine on the{" "}
            <span className="font-bold">Cardano</span> blockchain. */}
            <MarkdownPreviewer
              content={t(
                "dashboardGlobalComponents.dialogs.tokenizeWineDialog.description",
              )}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* <DialogClose asChild> */}
          <Button variant="outline">
            {t(
              "dashboardGlobalComponents.dialogs.tokenizeWineDialog.buttons.cancelButtonLabel",
            )}
          </Button>
          {/* </DialogClose> */}
          {/* <DialogClose asChild> */}
          <Button onClick={handleTokenize}>
            {t(
              "dashboardGlobalComponents.dialogs.tokenizeWineDialog.buttons.confirmButtonLabel",
            )}
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
