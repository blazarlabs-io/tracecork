import { PageHeader } from "@/components/layouts/page-header";
import { Separator } from "@repo/ui/components/ui/separator";
import { AutoSave } from "../forms/auto-save";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const GeneralSettingsPage = () => {
  const { t } = useTranslationHandler();

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title={t("generalSettings.headline")}
        subtitle={t("generalSettings.subHeadline")}
      />
      <Separator className="w-full" />
      <AutoSave />
    </div>
  );
};
