import { db } from "@/lib/firebase/services/db";
import { DbResponse, Wine } from "@/types/db";
import { useEffect, useState } from "react";
("../services/logger");

export const useGetWine = (wineId: string) => {
  const [wine, setWine] = useState<Wine | null>(null);

  useEffect(() => {
    db.wine
      .getSingle(wineId)
      .then((res: DbResponse) => {
        setWine(res.data as Wine);
      })
      .catch((error: DbResponse) => {
        console.log(error);
      });
  }, [wineId]);

  return { wine };
};
