"use client";

import {
  Map,
  MapCameraProps,
  MapCameraChangedEvent,
  useMap,
  Marker,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Coordinates } from "@/types/db";

export interface MapLocationViewerProps {
  initialPosition: Coordinates;
  onChange: (position: Coordinates) => void;
}

export const MapLocationViewer = ({
  initialPosition,
  onChange,
}: MapLocationViewerProps) => {
  const INITIAL_CAMERA = {
    center: {
      lat: parseFloat(initialPosition.lat),
      lng: parseFloat(initialPosition.lng),
    },
    zoom: 15,
  };

  const map = useMap();

  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const [position, setPosition] = useState<Coordinates>(initialPosition);

  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  const handlePositionChange = (e: any) => {
    onChange({
      lat: e.detail.latLng?.lat as string,
      lng: e.detail.latLng?.lng as string,
    });
    setPosition({
      lat: e.detail.latLng?.lat as string,
      lng: e.detail.latLng?.lng as string,
    });
  };

  return (
    <Map
      {...cameraProps}
      style={{ width: "100%", height: "100%" }}
      mapTypeId={"terrain"}
      onCameraChanged={handleCameraChange}
      disableDefaultUI={true}
      onClick={(e) => {
        handlePositionChange(e);
      }}
    >
      <Marker
        position={{
          lat: parseFloat(position.lat),
          lng: parseFloat(position.lng),
        }}
      />
    </Map>
  );
};
