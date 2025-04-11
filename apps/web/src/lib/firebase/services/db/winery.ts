import { DbResponse, Winery } from "@/types/db";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../client";

export const winery = {
  set: async (id: string, winery: Winery): Promise<DbResponse> => {
    try {
      const docRef = doc(db, "wineries", id);
      const res = await setDoc(docRef, winery);
      return { data: res, error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  update: async (id: string, data: any): Promise<DbResponse> => {
    try {
      const docRef = doc(db, "wineries", id);
      const res = await updateDoc(docRef, data);
      return { data: res, error: null, code: 200 };
    } catch (error) {
      console.log(error);
      return { data: null, error, code: 500 };
    }
  },
  getOne: async (id: string): Promise<DbResponse> => {
    try {
      const docRef = doc(db, "wineries", id);
      const res = await getDoc(docRef);
      return { data: res.data(), error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  getAll: async (): Promise<DbResponse> => {
    try {
      const res = await getDocs(collection(db, "wineries"));
      return {
        data: res.docs.map((doc) => ({ ...doc.data() })),
        error: null,
        code: 200,
      };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
};
