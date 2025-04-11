import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../client";
import { Wine, DbResponse } from "@/types/db";

export const wine = {
  set: async (uid: string, wine: Wine): Promise<DbResponse> => {
    try {
      const wineryRef = doc(db, "wineries", uid);
      const wineRef = collection(wineryRef, "wines");
      const res = await setDoc(doc(wineRef, wine.id), wine);
      return { data: res, error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  getOne: async (uid: string, wineId: string): Promise<DbResponse> => {
    try {
      const wineryRef = doc(db, "wineries", uid);
      const wineRef = collection(wineryRef, "wines");
      const res = await getDoc(doc(wineRef, wineId));
      return { data: res.data(), error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  getSingle: async (wineId: string): Promise<DbResponse> => {
    try {
      const res = query(
        collectionGroup(db, "wines"),
        where("id", "==", wineId),
      );
      const querySnapshot = await getDocs(res);
      const wines = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      return { data: wines[0], error: null, code: 200 };
    } catch (error) {
      console.log(error);
      return { data: null, error, code: 500 };
    }
  },
  getAll: async (uid?: string): Promise<DbResponse> => {
    try {
      if (uid) {
        const wineryRef = doc(db, "wineries", uid);
        const wineRef = collection(wineryRef, "wines");
        const res = await getDocs(wineRef);
        const wines = res.docs.map((doc) => ({ ...doc.data() }));
        return { data: wines, error: null, code: 200 };
      } else {
        const res = query(collectionGroup(db, "wines"));
        const querySnapshot = await getDocs(res);
        const wines = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        return { data: wines, error: null, code: 200 };
      }
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  update: async (
    uid: string,
    wineId: string,
    data: any,
  ): Promise<DbResponse> => {
    try {
      const wineryRef = doc(db, "wineries", uid);
      const wineRef = collection(wineryRef, "wines");
      const res = await updateDoc(doc(wineRef, wineId), data); // Replace 'commentID' if needed
      return { data: res, error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  delete: async (uid: string, wineId: string): Promise<DbResponse> => {
    try {
      const wineryRef = doc(db, "wineries", uid);
      const wineRef = collection(wineryRef, "wines");
      const res = await deleteDoc(doc(wineRef, wineId));
      return { data: res, error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
};
