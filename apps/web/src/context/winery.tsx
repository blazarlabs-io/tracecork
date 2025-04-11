"use client";

import { DbResponse, DynamicQrCode, Wine, Winery } from "@/types/db";
import { useAuth } from "./auth";

// LIBS
import { wineryTemplate } from "@/data/templates";
import { db as firestoreDb } from "@/lib/firebase/client";
import { db } from "@/lib/firebase/services/db";
import { collection, doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export interface WineryContextInterface {
  winery: Winery | null;
  wines: Wine[] | null;
  qrCodes: DynamicQrCode[] | null;
}

const contextInitialData: WineryContextInterface = {
  winery: null,
  wines: null,
  qrCodes: null,
};

const WineryContext = createContext(contextInitialData);

export const useWinery = (): WineryContextInterface => {
  const context = useContext<WineryContextInterface>(WineryContext);

  if (context === undefined) {
    throw new Error("use Provider Winery must be used as within a Provider");
  }

  return context;
};

export const WineryProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const { user } = useAuth();
  const [winery, setWinery] = useState<Winery | null>(null);
  const [wines, setWines] = useState<Wine[] | null>(null);
  const [qrCodes, setQrCodes] = useState<DynamicQrCode[] | null>(null);

  useEffect(() => {
    let unsubscribeWinery: Unsubscribe;
    let unsubscribeWine: Unsubscribe;
    let unsubscribeQrCodes: Unsubscribe;

    if (user) {
      // * realtime wineries collection subscription
      unsubscribeWinery = onSnapshot(
        doc(firestoreDb, "wineries", user.uid),
        async (doc) => {
          // console.log("Realtime WINERY data: ", doc.data());
          if (doc.data() === null || doc.data() === undefined) {
            wineryTemplate.id = user.uid;
            await db.winery.set(user.uid, wineryTemplate);
            return;
          }
          setWinery(doc.data() as Winery);
        },
      );

      // * realtime wines collection subscription
      unsubscribeWine = onSnapshot(
        collection(firestoreDb, "wineries", user.uid, "wines"),
        async (querySnapshot) => {
          const wines: Wine[] = [];
          querySnapshot.forEach((doc) => {
            wines.push(doc.data() as Wine);
          });

          setWines(wines);
        },
      );

      // * realtime qrcodes collection subscription
      unsubscribeQrCodes = onSnapshot(
        collection(firestoreDb, "wineries", user.uid, "qrcodes"),
        async (querySnapshot) => {
          const qrcodes: DynamicQrCode[] = [];
          querySnapshot.forEach((doc) => {
            qrcodes.push(doc.data() as DynamicQrCode);
          });
          // console.log("Realtime QRCODES data: ", qrcodes);
          setQrCodes(qrcodes);
        },
      );
    }
    return () => {
      if (unsubscribeWinery) unsubscribeWinery();
      if (unsubscribeWine) unsubscribeWine();
      if (unsubscribeQrCodes) unsubscribeQrCodes();
    };
  }, [user]);

  const value = { winery, wines, qrCodes };

  return (
    <WineryContext.Provider value={value}>{children}</WineryContext.Provider>
  );
};
