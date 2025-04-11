import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendRecaptchaService } from "@/services/auth";

export const useCaptcha = ({
  synchWithFormState,
}: {
  synchWithFormState: () => void;
}) => {
  const recaptchaRef = useRef<typeof ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleExpired = () => {
    setIsVerified(false);
  };

  // * STATIC HANDLERS
  const handleCaptchaSubmission = useCallback(async (token: string | null) => {
    try {
      if (!token) return;
      await sendRecaptchaService(token);
      setIsVerified(true);
    } catch (e) {
      setIsVerified(false);
    }
  }, []);

  const handleChange = useCallback((token: string | null) => {
    handleCaptchaSubmission(token);
    try {
      synchWithFormState();
    } catch (e) {
      return;
    }
  }, []);

  return { recaptchaRef, isVerified, handleExpired, handleChange };
};
