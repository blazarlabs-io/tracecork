import { Wine } from "@/types/db";
import { TriangleAlert } from "lucide-react";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface WinePublishProps {
  wine: Wine;
}

export const WinePublish = ({ wine }: WinePublishProps) => {
  const { t } = useTranslationHandler();
  return (
    <div className="mx-auto my-6 max-w-[520px] rounded-md border border-[#f2d450] bg-[#fffefb] p-4">
      <TriangleAlert className="mr-2 inline-block h-5 w-5 text-[#f2d450]" />
      <span>{t("wineStepper.publishWine.alertMessage")}</span>
    </div>
  );
};
