"use client";

import { DbResponse, KeyValueType, PricingLevel, Sweetness } from "@/types/db";
import { db } from "@/lib/firebase/services/db";
import { createContext, useContext, useEffect, useState } from "react";

export interface SystemVariablesContextInterface {
  countries: string[];
  volumes: string[];
  pricing: PricingLevel[];
  allergens: KeyValueType[];
  rawMaterials: KeyValueType[];
  wineTypes: KeyValueType[];
  sweetness: Sweetness;
}

const contextInitialData: SystemVariablesContextInterface = {
  pricing: [],
  allergens: [],
  countries: [],
  rawMaterials: [],
  volumes: [],
  wineTypes: [],
  sweetness: {} as Sweetness,
};

const SystemVariablesContext = createContext(contextInitialData);

export const useSystemVariables = (): SystemVariablesContextInterface => {
  const context = useContext<SystemVariablesContextInterface>(
    SystemVariablesContext,
  );

  if (context === undefined) {
    throw new Error(
      "use Provider SystemVariables must be used as within a Provider",
    );
  }

  return context;
};

export const SystemVariablesProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [pricing, setPricing] = useState<PricingLevel[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [volumes, setVolumes] = useState<string[]>([]);

  const [allergens, setAllergens] = useState<KeyValueType[]>([]);
  const [rawMaterials, setRawMaterials] = useState<KeyValueType[]>([]);
  const [wineTypes, setWineTypes] = useState<KeyValueType[]>([]);
  const [sweetness, setSweetness] = useState<Sweetness>({} as Sweetness);

  useEffect(() => {
    db.systemVariables
      .getAll()
      .then((response: DbResponse) => {
        response.data.map((v: any) => {
          if (Object.keys(v).includes("pricing")) {
            setPricing(v.pricing);
          }
          if (Object.keys(v).includes("allergens")) {
            setAllergens(v.allergens);
          }
          if (Object.keys(v).includes("countries")) {
            setCountries(v.countries);
          }
          if (Object.keys(v).includes("rawMaterials")) {
            setRawMaterials(v.rawMaterials);
          }
          if (Object.keys(v).includes("volumes")) {
            setVolumes(v.volumes);
          }
          if (Object.keys(v).includes("wineTypes")) {
            setWineTypes(v.wineTypes);
          }
          if (Object.keys(v).includes("sweetness")) {
            setSweetness(v.sweetness);
          }
        });
      })
      .catch((error: DbResponse) => {
        console.log(error);
      });

    // ? Uncomment and modify to add systemvariables to DB
    // db.systemVariables
    //   .set("sweetness", { sweetness: sweetnessData })
    //   .then((response: DbResponse) => {
    //     console.log(response);
    //   })
    //   .catch((error: DbResponse) => {
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

  return (
    <SystemVariablesContext.Provider value={value}>
      {children}
    </SystemVariablesContext.Provider>
  );
};
