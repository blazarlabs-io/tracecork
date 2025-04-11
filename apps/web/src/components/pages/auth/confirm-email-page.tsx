"use client";

import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { ConfirmEmailParamsType } from "@/types/authTypes";
import { useConfirmEmailHandler } from "@/hooks/auth";

export const ConfirmEmailPage = (params: ConfirmEmailParamsType) => {
  const { t } = useTranslationHandler();
  const { isConfirming, isError, handleContinueToTracecork } =
    useConfirmEmailHandler(params);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {!isError && (
        <Image
          src="/images/email-confirmation.svg"
          alt="Logo"
          width={320}
          height={100}
        />
      )}
      {isError ? (
        <>
          <h1 className="text-3xl pb-4 font-medium text-center">
            {t("authPages.confirmEmail.errorMessage")}
          </h1>
          <Button size="lg" onClick={handleContinueToTracecork}>
            {t("authPages.confirmEmail.continueButtonLabel")}
          </Button>
        </>
      ) : isConfirming ? (
        <h1 className="text-3xl pb-4 font-medium text-center">
          {t("authPages.confirmEmail.confirmMessage")}
        </h1>
      ) : (
        <>
          <h1 className="text-3xl font-medium text-center">
            {t("authPages.confirmEmail.title")}
          </h1>
          <p className="py-6 text-base font-normal text-muted-foreground">
            {t("authPages.confirmEmail.message")}
          </p>
          <Button size="lg" onClick={handleContinueToTracecork}>
            {t("authPages.confirmEmail.continueButtonLabel")}
          </Button>
        </>
      )}
    </div>
  );
};
