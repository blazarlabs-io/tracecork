"use client";

import { Coordinates } from "@/types/db";
import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import { MapLocationViewer } from "./map-location-viewer";
// import { MapLocationViewer } from "../../shared/widgets/map-location-viewer";

export interface PositionSetMapProps {
  initialPosition: Coordinates;
  onCancel: () => void;
  onSave: (position: Coordinates) => void;
}

export const PositionSetMap = ({
  initialPosition,
  onCancel,
  onSave,
}: PositionSetMapProps) => {
  const [position, setPosition] = useState<Coordinates>(initialPosition);

  const handleChange = (pos: Coordinates) => {
    setPosition(pos);
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/80">
      <div className="flex h-[640px] w-[800px] flex-col items-start justify-start gap-[16px] rounded-[8px] border bg-background p-[16px]">
        <MapLocationViewer
          initialPosition={initialPosition}
          onChange={(pos: Coordinates) => {
            handleChange(pos);
          }}
        />
        <div className="flex w-full items-center justify-end gap-[16px]">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onSave(position);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
