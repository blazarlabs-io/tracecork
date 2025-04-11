import { DbResponse, DynamicQrCode } from "@/types/db";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../client";

export const qrCode = {
  set: async (uid: string, qrCode: DynamicQrCode): Promise<DbResponse> => {
    try {
      const wineryRef = doc(db, "wineries", uid);
      const qrRef = collection(wineryRef, "qrcodes");
      const res = await setDoc(doc(qrRef, qrCode.wineId), qrCode);
      return { data: res, error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  getOne: async (uid: string, wineId: string): Promise<DbResponse> => {
    try {
      const wineryRef = doc(db, "wineries", uid);
      const qrRef = collection(wineryRef, "qrcodes");
      const res = await getDoc(doc(qrRef, wineId));
      return { data: res.data(), error: null, code: 200 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
  getAll: async (uid: string): Promise<DbResponse> => {
    try {
      if (uid) {
        const wineryRef = doc(db, "wineries", uid);
        const qrRef = collection(wineryRef, "qrcodes");
        const res = await getDocs(qrRef);
        const qrcodes = res.docs.map((doc) => ({ ...doc.data() }));
        return { data: qrcodes, error: null, code: 200 };
      } else {
        return { data: null, error: null, code: 400 };
      }
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  },
};
