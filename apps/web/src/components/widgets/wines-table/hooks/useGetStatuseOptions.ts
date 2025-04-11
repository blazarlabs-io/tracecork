import { useMemo } from "react";
import { statuses } from "../data/data";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const useGetStatuseOptions = () => {
  const { t } = useTranslationHandler();

  const options = useMemo(() => {
    return statuses.map((s, i) => ({
      ...s,
      label: t(`myWines.filters.status.states.${i}`),
    }));
  }, [t]);

  return { options };
};
