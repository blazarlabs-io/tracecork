import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../client";

export const winery: any = {
  getAll: async () => {
    try {
      const wineriesRef = collection(db, "wineries");
      const wineries = await getDocs(wineriesRef);
      return {
        status: 200,
        data: wineries.docs.map((doc) => doc.data()),
      };
    } catch (error) {
      return {
        status: 500,
        data: error,
      };
    }
  },
  getOne: async (id: string) => {
    try {
      const wineriesRef = doc(db, "wineries", id);
      const wineryDoc = await getDoc(wineriesRef);
      return {
        status: 200,
        data: wineryDoc.data(),
      };
    } catch (error) {
      return {
        status: 500,
        data: error,
      };
    }
  },
  update: async (id: string, data: any) => {
    try {
      const wineriesRef = doc(db, "wineries", id);
      await updateDoc(wineriesRef, data);
      return {
        status: 200,
        data: "winery updated",
      };
    } catch (error) {
      return {
        status: 500,
        data: error,
      };
    }
  },
};
