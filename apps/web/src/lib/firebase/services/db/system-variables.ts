import { DbResponse } from "@/types/db";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../client";

export const systemVariables = {
  getOne: async (docId: string): Promise<DbResponse> => {
    try {
      const docRef = doc(db, "systemVariables", docId);
      const res = await getDoc(docRef);
      return { data: res.data(), error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  getAll: async (): Promise<DbResponse> => {
    try {
      const res = await getDocs(collection(db, "systemVariables"));
      const vars = res.docs.map((doc) => ({ ...doc.data() }));
      return { data: vars, error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  set: async (docId: string, data: any): Promise<DbResponse> => {
    try {
      const docRef = doc(db, "systemVariables", docId);
      const res = await setDoc(docRef, data);
      return { data: res, error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
};
