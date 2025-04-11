"use client";

import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { useCustomCountDown } from "@/hooks/use-custom-count-down";
import { sendPasswordRecoveryEmailService } from "@/services/auth/auth-emails-services";
import { useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { useGetForgotPassEmail } from "@/hooks/auth";

export const PasswordResetSentPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // * HOOKS
  const { t } = useTranslationHandler();
  const router = useRouter();

  const { forgotPassEmail } = useGetForgotPassEmail();
  const { timeLeft, startCountDown } = useCustomCountDown(30);

  const resendHandler = async () => {
    try {
      if (!forgotPassEmail) return;
      setIsSubmitting(true);
      await sendPasswordRecoveryEmailService(forgotPassEmail);
      startCountDown();
    } catch (error) {
      console.error("Error Submitting forgot password request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full max-w-[520px] flex-col items-center justify-center gap-4">
      <Image
        src="/images/verify-email.svg"
        alt="Logo"
        width={520}
        height={48}
      />
      <h2 className="mt-12 text-2xl font-bold text-center">
        {t("authPages.passwordResetSent.title")}
      </h2>
      <p className="text-center">{t("authPages.passwordResetSent.message")}</p>
      <p className="text-center">
        {`${t("authPages.passwordResetSent.question")} `}
        {timeLeft >= 0 ? (
          <span className="text-primary">
            {t("authPages.passwordResetSent.resendInMessage", {
              timeLeft,
            })}
          </span>
        ) : (
          <button
            disabled={isSubmitting}
            className={cn("text-primary underline", "disabled:opacity-50")}
            onClick={() => resendHandler()}
          >
            {t("authPages.passwordResetSent.resendButtonLable")}
          </button>
        )}
      </p>
      <Button
        type="button"
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => router.replace("/login")}
      >
        <ArrowLeft className="h-4 w-4" />
        {t("authPages.passwordResetSent.backButtonLable")}
      </Button>
    </div>
  );
};
