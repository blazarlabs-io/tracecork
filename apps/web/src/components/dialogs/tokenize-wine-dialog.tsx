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

  function getImageBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };

      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(file); // Reads the file as a base64-encoded string
    });
  }

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

    const base64Data = await getImageBase64(imgFile);

    data.append("base64Data", base64Data);

    try {
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const res = await uploadRequest.json();
      // const signedUrl = res.url;
      return res;
    } catch (e) {
      console.log("Error uploading file", e);
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
      console.error("Error fetching or converting image:", error);
      return null;
    }
  };

  const handleTokenize = async () => {
    setOpen(false);

    // const imageFile = await getImageFileFromUrl(
    //   wine.generalInfo.image,
    //   `${wine.generalInfo.collectionName.replace(" ", "-").toLocaleLowerCase()}-cover.jpg`,
    // );

    // * Upload image
    // const res = await uploadFile(imageFile as File); // "xxx/ipfs/0195b9b2-3fb3-74e0-ace6-53807d2c7014"; //
    // console.log(res);

    // console.log("\n====================================");
    // const splittedUrl = imgUploadRes?.split("/ipfs/");
    // const imgIpfs = `ipfs://${res.uploadData}`;
    // console.log("imageFile", imageFile);
    // console.log("imgUploadRes", imgUploadRes);
    // console.log("splittedUrl", splittedUrl);
    // console.log("imgIpfs", imgIpfs);
    // console.log("====================================\n");

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
        image:
          "ipfs://bafybeigl3fcyqwzutlv54yurvjm5ikevh4hrmjqsjs5jbtqnabwzevcmby", //imgIpfs,
        name: wine?.generalInfo.collectionName,
      },
      batch_quantity: [
        parseInt(wine?.generalInfo.collectionSize as string),
        parseInt(wine?.generalInfo.collectionSize as string),
      ],
    };

    // console.log("newBatchData:", newBatchData);

    tokenizeBatch(newBatchData, async (data: any) => {
      // console.log("\n\n+++++++++++++++++++\n");
      // console.log("newBatchData:", newBatchData);
      // console.log("UID:", uid);
      // console.log("WINE:", wine);
      // console.log("DATA:", data);
      // console.log("tokenRefId:", data.tokenRefId);
      // console.log("txId:", data.txId);
      // console.log("\n+++++++++++++++++++\n\n");
    });
  };

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
