"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { PricingLevel, Sweetness } from "../types/db";
import { client } from "../lib/sanity/client";

export interface CmsContextInterface {
  pricing: PricingLevel[];
  allergens: string[];
  countries: string[];
  rawMaterials: string[];
  volumes: string[];
  wineTypes: string[];
  sweetness: Sweetness;
}

const contextInitialData: CmsContextInterface = {
  pricing: [],
  allergens: [],
  countries: [],
  rawMaterials: [],
  volumes: [],
  wineTypes: [],
  sweetness: {} as Sweetness,
};

const CmsContext = createContext(contextInitialData);

export const useCms = (): CmsContextInterface => {
  const context = useContext<CmsContextInterface>(CmsContext);

  if (context === undefined) {
    throw new Error("use Provider CMS must be used as within a Provider");
  }

  return context;
};

export const CmsProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [pricing, setPricing] = useState<PricingLevel[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [rawMaterials, setRawMaterials] = useState<string[]>([]);
  const [volumes, setVolumes] = useState<string[]>([]);
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [sweetness, setSweetness] = useState<Sweetness>({} as Sweetness);

  const getSystemVariables = async () => {
    const data = await client.fetch('*[_type == "systemVariables"]');
    return data;
  };

  useEffect(() => {
    // getSystemVariables()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const value = {
    pricing,
    allergens,
    countries,
    rawMaterials,
    volumes,
    wineTypes,
    sweetness,
  };

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
};
