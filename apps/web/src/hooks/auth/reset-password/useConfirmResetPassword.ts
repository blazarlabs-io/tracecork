import { checkActionCode } from "firebase/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { auth } from "@/lib/firebase/client";

export const useConfirmResetPassword = (oobCode: string) => {
  const mountRef = useRef<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [isConfirming, setIsConfirming] = useState(true);

  const confirmHandler = useCallback(async () => {
    try {
      setIsError(false);
      const action = await checkActionCode(auth, oobCode);
      if (action.operation !== "PASSWORD_RESET") {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsConfirming(false);
    }
  }, [oobCode]);

  useEffect(() => {
    if (mountRef.current) return;
    const timeoutId = setTimeout(() => {
      confirmHandler();
      mountRef.current = true;
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [confirmHandler]);

  return { isConfirming, isError };
};
