import { Wine } from "@/types/db";
import { useEffect, useState } from "react";

export const useGetVintage = (wine: Wine) => {
  const [vintage, setVintage] = useState<string | null>(null);

  useEffect(() => {
    if (wine) {
      let oldest = new Date().getFullYear();
      wine.generalInfo.grapeVarieties.map((grape) => {
        const v = parseInt(grape.vintage);
        // Find the lowest vintage
        if (v < oldest) {
          oldest = v;
        }
      });
      setVintage(oldest.toString());
    }
  }, [wine]);

  return { vintage };
};
