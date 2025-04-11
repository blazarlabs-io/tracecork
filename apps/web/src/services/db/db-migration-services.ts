import { DocumentData } from "firebase/firestore";
import { BackupType } from "./db.migration-utils-services";
import { adminFirestore } from "@/lib/firebase/admin";

type DataType = {
  docId: string;
  docData: DocumentData;
  collections: string[];
  collectionData: {
    collection: string;
    docsData: DataType[];
  }[];
};

export const getCollectionDataService = async (collectionName: string) => {
  const db = adminFirestore;
  const collection = await db.collection(collectionName).get();

  const data: DataType[] = [];
  if (!collection.empty) {
    for (const doc of collection.docs) {
      const subCollections = await doc.ref.listCollections();
      const auxSubCollections = subCollections.map((sColl) => sColl.id);
      const docDataType: DataType = {
        docId: doc.id,
        docData: doc.data(),
        collections: auxSubCollections,
        collectionData: [],
      };
      data.push(docDataType);
    }
  }
  return data;
};

export const getCollectionNestedDataService = async (
  collectionName: string,
) => {
  const db = adminFirestore;
  const collection = await db.collection(collectionName).get();

  const data: DataType[] = [];
  if (!collection.empty) {
    for (const doc of collection.docs) {
      const subCollections = await doc.ref.listCollections();
      const auxSubCollections = subCollections.map((sColl) => sColl.id);
      const docDataType: DataType = {
        docId: doc.id,
        docData: doc.data(),
        collections: auxSubCollections,
        collectionData: [],
      };
      for (const subCollection of auxSubCollections) {
        const nestedCollection = `${collectionName}/${doc.id}/${subCollection}`;
        const collData = await getCollectionDataService(nestedCollection);
        docDataType.collectionData.push({
          collection: subCollection,
          docsData: collData,
        });
      }
      data.push(docDataType);
    }
  }
  return data;
};

export const getApplyDataService = async (
  responseData: {
    uDocId: string;
    wines: BackupType[];
  }[],
) => {
  const db = adminFirestore;

  for (const uData of responseData) {
    if (!uData.uDocId) continue;

    for (const w of uData.wines) {
      const { type, rawMaterial, sweetness, wineId } = w;
      if (!type) continue;

      const wineryDocReff = db.collection("wineries").doc(uData.uDocId);
      const wineDocReff = wineryDocReff.collection("wines").doc(wineId);

      const wineDoc = await wineDocReff.get();
      if (!wineDoc.exists) continue;

      const wineData = { ...wineDoc.data() };

      if (wineData?.generalInfo?.type) {
        wineData.generalInfo.type = type;
      }

      if (wineData?.ingredients?.rawMaterial) {
        wineData.ingredients.rawMaterial = rawMaterial;
      }

      if (wineData?.profile?.sweetness) {
        wineData.profile.sweetness = sweetness;
      }

      await wineDocReff.update(wineData);
    }
  }
};
