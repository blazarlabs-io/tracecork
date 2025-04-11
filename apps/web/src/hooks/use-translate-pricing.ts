import { useMemo } from "react";
import { PricingLevel } from "../types/db";
import { useTranslationHandler } from "./use-translation-handler";

export const useTranslatePricing = (pricing: PricingLevel[]) => {
  const { t, locale } = useTranslationHandler();

  const tPricing = useMemo(() => {
    return pricing.map((d, i) => {
      return {
        ...d,
        name: t(`systemVariables.pricing.${i}.name`),
        qrCodes: t(`systemVariables.pricing.${i}.qrcodes`, {
          value: d.qrCodes,
        }),
        language: {
          ...d.language,
          description: t(`systemVariables.pricing.${i}.language.description`),
        },
        editable: {
          ...d.editable,
          description: t(`systemVariables.pricing.${i}.editable.description`),
        },
        training: {
          ...d.training,
          description: t(`systemVariables.pricing.${i}.training.description`),
        },
        tokenization: {
          ...d.tokenization,
          description: t(
            `systemVariables.pricing.${i}.tokenization.description`,
          ),
        },
        analytics: {
          ...d.analytics,
          description: t(`systemVariables.pricing.${i}.analytics.description`),
        },
        earlyAccess: {
          ...d.earlyAccess,
          description: t(
            `systemVariables.pricing.${i}.earlyAccess.description`,
          ),
        },
      };
    });
  }, [pricing, t, locale]);

  return { tPricing };
};
