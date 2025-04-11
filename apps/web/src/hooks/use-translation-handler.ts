import { useLocale, useTranslations, useMessages } from "next-intl";

export const useTranslationHandler = () => {
  const locale = useLocale();
  const t = useTranslations(locale);
  const msg = useMessages();

  return { locale, t, msg };
};
