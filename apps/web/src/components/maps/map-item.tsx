/* eslint-disable @next/next/no-img-element */
import { initialCoordinates } from "@/data/templates";
import { Coordinates } from "@/types/db";
import { useCallback, useEffect, useRef, useState } from "react";
import { PositionSetMap } from "./position-set-map";
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from "@/utils/envConstants";

export interface MapItemProps {
  initialPosition: Coordinates | null;
  onSave: (position: Coordinates) => void;
  onCancel: () => void;
}

export const MapItem = ({
  initialPosition,
  onSave,
  onCancel,
}: MapItemProps) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<Coordinates | null>(null);
  const [coordinateString, setCooordinateString] = useState<string>("");

  const mapRef = useRef<HTMLDivElement>(null);

  const handleOnEdit = useCallback(() => {
    setShowEditor(true);
  }, []);

  useEffect(() => {
    if (!initialPosition) {
      // set default position as Moldova, Chisinau
      setStartPosition(initialCoordinates);
      setCooordinateString("Moldova, Chisinau");
    } else if (initialPosition) {
      setStartPosition(initialPosition);
      setCooordinateString(
        `${parseFloat(initialPosition.lat).toFixed(6)}, ${parseFloat(initialPosition.lng).toFixed(6)}`,
      );
    }
  }, [initialPosition]);

  return (
    <>
      {startPosition && (
        <>
          {showEditor && (
            <PositionSetMap
              initialPosition={startPosition as Coordinates}
              onCancel={() => {
                setShowEditor(false);
              }}
              onSave={(position: Coordinates) => {
                setShowEditor(false);
                onSave(position);
              }}
            />
          )}
          <div className="flex flex-col gap-[8px]">
            <div className="flex max-w-fit items-center justify-center gap-[4px]"></div>
            <div
              ref={mapRef}
              className="relative h-[200px] w-full rounded-[8px] border"
            >
              <div
                onClick={handleOnEdit}
                className="group absolute left-[50%] top-[50%] flex h-full w-full -translate-x-[50%] -translate-y-[50%] cursor-pointer items-center justify-center rounded-[8px] border border-transparent transition-all duration-200 ease-in-out hover:border-muted-foreground/50 hover:bg-background/50 hover:backdrop-blur-[1px]"
              >
                <p className="rounded-[4px] bg-transparent p-[8px] text-transparent transition-all duration-200 ease-in-out group-hover:bg-secondary/80 group-hover:text-foreground">
                  Edit location
                </p>
              </div>
              {mapRef.current && (
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${coordinateString}&zoom=13&size=${mapRef.current?.clientWidth.toString()}x${mapRef.current?.clientHeight.toString()}&maptype=terrain&markers=${coordinateString}&key=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                  alt=""
                  className="h-full w-full rounded-[8px]"
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
