import { WineryDbBackup } from "@/types/winery-db-migration";
import { KeyValueType, sweetnessType } from "./system-variables-services";

export type BackupType = {
  wineId: string;
  type: string;
  rawMaterial: string;
  sweetness: string;
};

export const getTargetDateToMigrate = (data: WineryDbBackup[]) => {
  const responseData: {
    uDocId: string;
    wines: BackupType[];
  }[] = [];

  data.forEach((uDoc) => {
    const { collectionData } = uDoc;
    const wines: BackupType[] = [];
    collectionData.forEach((cData) => {
      if (cData.collection !== "wines") return;
      const { docsData } = cData;
      docsData.forEach((wineDoc) => {
        const { docId, docData } = wineDoc;
        const { generalInfo, ingredients, profile } = docData;
        wines.push({
          wineId: docId,
          type: generalInfo?.type || "",
          rawMaterial: ingredients?.rawMaterial || "",
          sweetness: profile?.sweetness || "",
        });
      });
    });

    if (!wines.length) return;
    responseData.push({
      uDocId: uDoc.docId,
      wines,
    });
  });

  return responseData;
};

export const setTargetKeys = (
  responseData: {
    uDocId: string;
    wines: BackupType[];
  }[],
  wineTypes: KeyValueType[],
  rawMaterials: KeyValueType[],
  sweetness: sweetnessType,
) => {
  responseData.forEach((uDoc) => {
    uDoc.wines.forEach((wData) => {
      const wType = wineTypes.find(
        (wT) => wT.value.toLowerCase() === wData.type.toLowerCase(),
      );
      if (wType) {
        wData.type = wType.key;
      }

      const rMaterial = rawMaterials.find(
        (rM) => rM.value.toLowerCase() === wData.rawMaterial.toLowerCase(),
      );
      if (rMaterial) {
        wData.rawMaterial = rMaterial.key;
      }

      const currSweetness = Object.values(sweetness)
        .flatMap((v) => v)
        .find(
          (s) =>
            s.value.toLowerCase() ===
            wData.sweetness.replace("-", " ").toLowerCase(),
        );

      if (currSweetness) {
        wData.sweetness = currSweetness.key;
      }
    });
  });

  return responseData;
};
