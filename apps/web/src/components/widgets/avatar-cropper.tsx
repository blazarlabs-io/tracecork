"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Slider } from "@repo/ui/components/ui/slider";
import getCroppedImg from "@/utils/cropper-utils";
import { useState } from "react";
import Cropper from "react-easy-crop";

export interface AvatarCropperProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedFile: string;
  setSelectedFile: (file: File | null) => void;
  onCroppedImage: (croppedImage: string) => void;
}

export const AvatarCropper = ({
  dialogOpen,
  setDialogOpen,
  selectedFile,
  setSelectedFile,
  onCroppedImage,
}: AvatarCropperProps) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [base64Crop, setBase64Crop] = useState<string>("");

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    const croppedImage = await getCroppedImg(selectedFile, croppedAreaPixels);
    setBase64Crop(croppedImage as string);
  };

  const onZoomChange = (zoom: any) => {
    setZoom(zoom);
  };

  const handleSave = () => {
    onCroppedImage(base64Crop);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="h-[480px] w-full">
        <DialogTitle></DialogTitle>
        <Cropper
          image={selectedFile}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={true}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
          style={{
            containerStyle: {
              position: "relative",
              width: "100%",
              height: 320,
            },
          }}
        />
        <div className="flex w-full flex-col gap-2">
          <span className="text-xs font-bold">Zoom</span>
          <Slider
            defaultValue={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(z) => onZoomChange(z)}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
