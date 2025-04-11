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
import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

export interface ImageCropperProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedFile: string;
  setSelectedFile: (file: File | null) => void;
  onCroppedImage: (croppedImage: string) => void;
}

export const ImageCropper = ({
  dialogOpen,
  setDialogOpen,
  selectedFile,
  setSelectedFile,
  onCroppedImage,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [base64Crop, setBase64Crop] = useState<string>("");
  const [rotation, setRotation] = useState<number>(0);

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    const croppedImage = await getCroppedImg(
      selectedFile,
      croppedAreaPixels,
      rotation,
    );
    setBase64Crop(croppedImage as string);
  };

  const onZoomChange = (zoom: any) => {
    setZoom(zoom);
  };

  const onRotationChange = (rotation: any) => {
    setRotation(rotation);
  };

  const handleSave = () => {
    onCroppedImage(base64Crop);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="min-w-[50%]">
        <DialogTitle>Image Editor</DialogTitle>
        <div className="relative flex w-full items-start gap-8">
          <div className="flex w-full flex-col gap-4">
            <Cropper
              image={selectedFile}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              cropShape="rect"
              showGrid={true}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onRotationChange={onRotationChange}
              onZoomChange={onZoomChange}
              style={{
                containerStyle: {
                  position: "relative",
                  width: "100%",
                  height: 480,
                  borderRadius: "var(--radius)",
                },
              }}
            />
            <div className="flex w-full gap-8">
              <div className="flex w-full flex-col gap-2">
                <span className="text-xs font-bold">Zoom</span>
                <Slider
                  defaultValue={[1]}
                  value={[zoom]}
                  min={1}
                  max={3}
                  step={0.1}
                  onValueChange={onZoomChange}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <span className="text-xs font-bold">Rotate</span>
                <Slider
                  defaultValue={[1]}
                  value={[rotation]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={onRotationChange}
                />
              </div>
            </div>
          </div>
          <div className="flex h-[200px] w-[200px] flex-col gap-2">
            <span className="text-sm font-bold">Sample Image</span>
            <div className="rounded-md border">
              <Output croppedArea={crop} src={"/images/wine-sample.png"} />
            </div>
            <span className="text-xs italic">
              Edit your image to match this sample&apos;s position and size.
            </span>
            {base64Crop.length > 0 && (
              <>
                <span className="mt-3 text-sm font-bold">Image Preview</span>
                <Output croppedArea={crop} src={base64Crop} />
                <span className="text-xs">
                  This is a preview of your edited image.
                </span>
              </>
            )}
          </div>
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

const CROP_AREA_ASPECT = 1;

const Output = ({ croppedArea, src }: any) => {
  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}
    >
      <img
        className="z-1 absolute left-0 top-0 h-full w-full rounded-md"
        src={src}
        alt=""
        style={imageStyle}
      />
    </div>
  );
};
