import {
  ActionCodeInfo,
  applyActionCode,
  checkActionCode,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth";
import { auth } from "@/lib/firebase/client";
import { ConfirmEmailParamsType } from "@/types/authTypes";
import { emailTemplates } from "@/utils/email-templates";
import { sendEmailService } from "@/services/email-services";

export const useConfirmEmailHandler = (params: ConfirmEmailParamsType) => {
  const { oobCode } = params;
  const router = useRouter();
  const { user } = useAuth();
  const mountRef = useRef<boolean>(false);
  const [isConfirming, setIsConfirming] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleContinueToTracecork = () => {
    user?.reload();
    if (typeof window !== "undefined") window.location.href = "/";
  };

  const handleVerifyEmail = useCallback(
    async (action: ActionCodeInfo) => {
      if (action.operation !== "VERIFY_EMAIL")
        throw new Error("Operation not allowed");

      const userName = user ? user.displayName : "";
      const userEmail = user ? user.email : "";
      const dataEmail = action.data.email;
      const email = dataEmail || userEmail;
      if (!email) throw new Error("Email not found");

      await applyActionCode(auth, oobCode);
      // * The user's email address has been verified. Send welcome email
      await sendEmailService({
        toEmail: email,
        templateId: emailTemplates["welcome-email"],
        dynamicTemplateData: {
          user: userName || email,
        },
      });
      user?.reload();
      setIsConfirming(false);
    },
    [oobCode, user],
  );

  const passwordResetHandler = useCallback(
    async (action: ActionCodeInfo) => {
      if (action.operation !== "PASSWORD_RESET")
        throw new Error("Operation not allowed");
      const queryParams = new URLSearchParams({ ...params });
      router.replace(`/password-reset?${queryParams.toString()}`);
    },
    [params],
  );

  const mainHandler = useCallback(async () => {
    try {
      if (!oobCode) {
        router.replace("/");
        return;
      }
      setIsError(false);
      const action = await checkActionCode(auth, oobCode);
      if (action.operation === "VERIFY_EMAIL") {
        await handleVerifyEmail(action);
      } else if (action.operation === "PASSWORD_RESET") {
        passwordResetHandler(action);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }, [oobCode, handleVerifyEmail, passwordResetHandler]);

  useEffect(() => {
    if (mountRef.current) return;
    const timeoutId = setTimeout(() => {
      mainHandler();
      mountRef.current = true;
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [mainHandler]);

  return { isConfirming, isError, handleContinueToTracecork };
};
