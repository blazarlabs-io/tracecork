"use client";

import { Save } from "lucide-react";
import { WineryForm } from "@/components/forms/winery-form";
import { PageHeader } from "@/components/layouts/page-header";
import { Separator } from "@repo/ui/components/ui/separator";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const WineryDetailsPage = () => {
  const { t } = useTranslationHandler();
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-end justify-between">
        <PageHeader
          title={t("wineryDetails.headline")}
          subtitle={t("wineryDetails.subHeadline")}
        />
        {/* <div className="flex min-w-fit items-center gap-2">
          <Save size={16} className="text-primary" />
          <p className="text-xs font-medium text-muted-foreground">
            Autosave enabled
          </p>
        </div> */}
      </div>
      <Separator className="w-full" />
      <WineryForm />
    </div>
  );
};
