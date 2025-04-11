import { db } from "@/lib/firebase/services/db";
import { DbResponse } from "@/types/db";
import { useEffect, useRef, useState } from "react";

export const useQrCodeExists = (uid: string, wineId: string) => {
  // * STATES
  const [qrCodeExists, setQrCodeExists] = useState<boolean | null>(null);

  // * REFS
  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    if (!mountRef.current && uid && wineId) {
      db.qrCode
        .getOne(uid, wineId)
        .then((res: DbResponse) => {
          if (res.data) {
            setQrCodeExists(true);
          } else {
            setQrCodeExists(false);
          }
        })
        .catch((error: DbResponse) => {
          console.log(error);
        });
    }
  }, [uid, wineId]);

  return { qrCodeExists };
};
