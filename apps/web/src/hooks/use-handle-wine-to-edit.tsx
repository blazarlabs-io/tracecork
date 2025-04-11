import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth";
import { useWinery } from "@/context/winery";
import { DbResponse, Wine } from "@/types/db";
import { db } from "@/lib/firebase/services/db";
import { wineTemplate } from "@/data/templates";
import { Timestamp } from "firebase/firestore";

export const useHandleWineToEdit = (wineId: string) => {
  // * HOOKS
  const { user } = useAuth();
  const { winery, wines } = useWinery();

  // * STATES
  const [wine, setWine] = useState<Wine | null>(null);

  // * REFS
  const mountRef = useRef<boolean>(false);

  // * on mount autopopulate form with DB data
  useEffect(() => {
    if (winery && user && wineId) {
      // mountRef.current = true;

      db.wine
        .getOne(user?.uid, wineId)
        .then((res: DbResponse) => {
          // * if no wine exists, create it
          if (!res.data || res.data === undefined) {
            wineTemplate.id = wineId;
            wineTemplate.uid = user?.uid;
            wineTemplate.status = "draft";
            wineTemplate.createdAt = Timestamp.fromDate(new Date());
            wineTemplate.lastUpdated = Timestamp.fromDate(new Date());
            wineTemplate.generalInfo.wineryName = winery?.info?.name as string;

            // populateForm(wineTemplate);
            setWine(wineTemplate);

            db.wine
              .set(user?.uid, wineTemplate)
              .then((res: DbResponse) => {
                // console.log(res);
              })
              .catch((error: DbResponse) => {
                console.log(error);
              });
          } else {
            setWine(res.data as Wine);
            // populateForm(res.data as Wine);
          }
        })
        .catch((error: DbResponse) => {
          console.log(error);
        });
    }
  }, [winery, wines]);

  return { wine };
};
