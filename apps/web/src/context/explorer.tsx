"use client";

import { db } from "@/lib/firebase/services/db";
import { DbResponse, Wine } from "@/types/db";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
("../services/logger");

export interface ExplorerContextInterface {
  wines: Wine[] | null;
}

const contextInitialData: ExplorerContextInterface = {
  wines: null,
};

const ExplorerContext = createContext(contextInitialData);

export const useExplorer = (): ExplorerContextInterface => {
  const context = useContext<ExplorerContextInterface>(ExplorerContext);

  if (context === undefined) {
    throw new Error("use Provider Context must be used as within a Provider");
  }

  return context;
};

export const ExplorerProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [wines, setWines] = useState<Wine[] | null>(null);

  useEffect(() => {
    setWines(null);
    db.wine
      .getAll()
      .then((response: DbResponse) => {
        const filteredWines: Wine[] = response.data.filter(
          (wine: Wine) => wine.status === "published",
        );
        setWines(filteredWines);
      })
      .catch((error: DbResponse) => {
        console.log(error as any);
      });
  }, []);

  const value = { wines };

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  );
};
