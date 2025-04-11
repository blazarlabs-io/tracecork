"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import "@vis.gl/react-google-maps/examples.css";

export function useDrawingManager(
  initialValue: google.maps.drawing.DrawingManager | null = null,
) {
  const map = useMap();
  // const drawing = useMapsLibrary("drawing");

  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager | null>(initialValue);

  useEffect(() => {
    if (!map) return;
    setDrawingManager(null);
  }, [map]);

  return { drawingManager };
}
