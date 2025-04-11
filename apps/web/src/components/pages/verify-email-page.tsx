"use client";

import { useAuth } from "@/context/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { sendVerificationEmailService } from "@/services/auth/auth-emails-services";
import { useCustomCountDown } from "@/hooks/use-custom-count-down";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";

export const VerifyEmailPage = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isSending, setIsSending] = useState(false);
  // * HOOKS
  const router = useRouter();
  const { t } = useTranslationHandler();
  const { user } = useAuth();

  const { timeLeft, startCountDown } = useCustomCountDown(30);

  const handleResend = async () => {
    try {
      if (!user || !user.email) return;
      setIsSending(true);
      if (user.emailVerified) {
        router.replace("/dashboard/home");
      } else {
        // * Send verification email
        await sendVerificationEmailService(user.email);
      }
      startCountDown();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!!user && !user.emailVerified) {
      setIsChecking(false);
      return;
    }
    user?.reload();
    const newUrl = !!user ? "/dashboard/home" : "/login";
    const timeoutId = setTimeout(() => {
      router.replace(newUrl);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [user]);

  if (isChecking) return <h1>Loading...</h1>;

  return (
    <div
      className={cn(
        "w-full max-w-[640px]",
        "flex flex-col gap-3",
        "rounded-[12px] border px-2 py-4 sm:p-6",
      )}
    >
      <Image
        src="/images/verify-email.svg"
        alt="Verify Email"
        width={640}
        height={234}
      />
      <h2 className="text-center text-2xl font-bold text-foreground px-2">
        {t("authPages.verifyEmail.title")}
      </h2>
      <p className="text-center text-foreground">
        {t("authPages.verifyEmail.message")}
      </p>
      <div className="flex w-full items-center justify-center gap-2">
        <p className="text-center text-muted-foreground">
          {t("authPages.verifyEmail.question")}
        </p>
        {timeLeft >= 0 ? (
          <p className="text-center text-muted-foreground">
            {t("authPages.verifyEmail.resendInMessage", {
              timeLeft,
            })}
          </p>
        ) : (
          <button
            onClick={handleResend}
            className={cn(
              "font-bold text-primary",
              isSending ? "opacity-50" : "opacity-100",
            )}
            disabled={isSending}
          >
            {t("authPages.verifyEmail.resendButtonLable")}
          </button>
        )}
      </div>
    </div>
  );
};
