import { adminFirestore } from "@/lib/firebase/admin";

export type KeyValueType = {
  key: string;
  value: string;
};

export const getWineTypesServie = async () => {
  const db = adminFirestore;
  const doc = await db.collection("systemVariables").doc("wineTypes").get();
  if (!doc.exists) return;
  return doc.data()?.wineTypes as KeyValueType[];
};

export const getRawMaterialsServie = async () => {
  const db = adminFirestore;
  const doc = await db.collection("systemVariables").doc("rawMaterials").get();
  if (!doc.exists) return;
  return doc.data()?.rawMaterials as KeyValueType[];
};

export type sweetnessType = {
  other: KeyValueType[];
  dessert: KeyValueType[];
  sparkling: KeyValueType[];
};

export const getSweetnessServie = async () => {
  const db = adminFirestore;
  const doc = await db.collection("systemVariables").doc("sweetness").get();
  if (!doc.exists) return;
  return doc.data()?.sweetness as sweetnessType;
};
