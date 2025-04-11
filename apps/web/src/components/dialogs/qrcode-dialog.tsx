/* eslint-disable @next/next/no-img-element */
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
import { QrCode } from "lucide-react";

export interface QrCodeDialogProps {
  url: string;
}

export const QRCodeDialog = ({ url }: QrCodeDialogProps) => {
  const handleDownloadQrCode = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode.png`;
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex size-16 flex-col items-center justify-center rounded-md p-2 ring-2 ring-slate-200 ring-offset-2">
          {url ? (
            <img id="qrcode-img" src={url} alt="" className="size-18" />
          ) : (
            <>
              <QrCode className="size-16 text-muted-foreground" />
              <span className="mt-2 text-center text-[10px] leading-[10px] text-muted-foreground">
                QR Code unavailable
              </span>
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Qr Code</DialogTitle>
          {!url ? (
            <DialogDescription>
              Qr Code unavailable, please complete the form first and publish it
              to see the qr code.
            </DialogDescription>
          ) : (
            <div className="p-4">
              <img src={url} alt="" />
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="flex justify-end">
          {url && (
            <Button variant="outline" size="lg" onClick={handleDownloadQrCode}>
              Download
            </Button>
          )}
          <DialogClose asChild>
            <div className="flex h-10 min-w-fit cursor-pointer items-center justify-center rounded-md bg-primary px-6 text-sm text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/80">
              Ok
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
