"use client";

import { PricingLevel } from "@/types/db";
import { cn } from "@/utils/shadcn";
import { CircleCheck, CircleX } from "lucide-react";
import { UpgradePlanDialog } from "../dialogs/upgrade-plan-dialog";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { useTranslatePricing } from "@/hooks/use-translate-pricing";

export interface PricingPageProps {
  pricing: { data: PricingLevel[] };
}

export const PricingPage = ({ pricing }: PricingPageProps) => {
  const { tPricing } = useTranslatePricing(pricing.data);
  const { t } = useTranslationHandler();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-3xl font-bold">
          {t("publicPages.pricingPage.headline")}
        </h2>
        <p className="max-w-lg text-center">
          {t("publicPages.pricingPage.subHeadline")}
        </p>
        <UpgradePlanDialog />
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-8">
        {tPricing.map((level) => (
          <div
            key={level.name}
            className="flex min-w-[320px] max-w-[320px] flex-col items-start justify-start gap-4 rounded-lg border p-8 shadow-sm"
          >
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-sm font-medium capitalize text-muted-foreground">
                {level.name}
              </span>
              <span className="text-5xl font-bold capitalize text-foreground">
                €{level.price}
              </span>
            </div>
            <div className="h-[1px] w-full bg-border" />
            <div className="flex items-center justify-start gap-2">
              <CircleCheck className="max-h-4 min-h-4 min-w-4 max-w-4 text-primary" />
              <span className="text-sm capitalize text-foreground">
                {level.qrCodes}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <CircleCheck className="max-h-4 min-h-4 min-w-4 max-w-4 text-primary" />
              <span className="text-sm capitalize text-foreground">
                {level.language.description}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <CircleCheck className="max-h-4 min-h-4 min-w-4 max-w-4 text-primary" />
              <span className="text-sm capitalize text-foreground">
                {level.editable.description}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              {level.training.available ? (
                <CircleCheck
                  className={cn("max-h-4 min-h-4 min-w-4 max-w-4 text-primary")}
                />
              ) : (
                <CircleX
                  className={cn(
                    "max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground/50",
                  )}
                />
              )}

              <span
                className={cn(
                  "text-sm capitalize",
                  level.training.available
                    ? "text-foreground"
                    : "text-muted-foreground/50",
                )}
              >
                {level.training.description}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              {level.tokenization.available ? (
                <CircleCheck
                  className={cn("max-h-4 min-h-4 min-w-4 max-w-4 text-primary")}
                />
              ) : (
                <CircleX
                  className={cn(
                    "max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground/50",
                  )}
                />
              )}

              <span
                className={cn(
                  "text-sm capitalize",
                  level.tokenization.available
                    ? "text-foreground"
                    : "text-muted-foreground/50",
                )}
              >
                {level.tokenization.description}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              {level.analytics.available ? (
                <CircleCheck
                  className={cn("max-h-4 min-h-4 min-w-4 max-w-4 text-primary")}
                />
              ) : (
                <CircleX
                  className={cn(
                    "max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground/50",
                  )}
                />
              )}
              <span
                className={cn(
                  "text-sm capitalize",
                  level.analytics.available
                    ? "text-foreground"
                    : "text-muted-foreground/50",
                )}
              >
                {level.analytics.description}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              {level.earlyAccess.available ? (
                <CircleCheck
                  className={cn("max-h-4 min-h-4 min-w-4 max-w-4 text-primary")}
                />
              ) : (
                <CircleX
                  className={cn(
                    "max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground/50",
                  )}
                />
              )}
              <span
                className={cn(
                  "text-sm capitalize",
                  level.earlyAccess.available
                    ? "text-foreground"
                    : "text-muted-foreground/50",
                )}
              >
                {level.earlyAccess.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
