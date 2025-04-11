"use client";

import { onSnapshot, doc, collection, getDocs } from "firebase/firestore";
// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase/client";
import { useAuth } from "./auth";

export interface WineriesContextInterface {
  wineries: any[];
}

const contextInitialData: WineriesContextInterface = {
  wineries: [],
};

const WineriesContext = createContext(contextInitialData);

export const useWineries = (): WineriesContextInterface => {
  const context = useContext<WineriesContextInterface>(WineriesContext);

  if (context === undefined) {
    throw new Error("use Provider Wineries must be used as within a Provider");
  }

  return context;
};

export const WineriesProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [wineries, setWineries] = useState<any>([]);

  const value = { wineries };

  useEffect(() => {
    setWineries([]);

    const unsubscribeWinery = onSnapshot(
      collection(db, "wineries"),
      async (snapshot) => {
        snapshot.forEach((doc) => {
          setWineries((prev: any) => [...prev, doc.data()]);
        });
      },
    );

    return () => {
      unsubscribeWinery();
    };
  }, []);

  return (
    <WineriesContext.Provider value={value}>
      {children}
    </WineriesContext.Provider>
  );
};
