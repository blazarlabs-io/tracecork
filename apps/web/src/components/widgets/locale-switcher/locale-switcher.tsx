"use client";

import { useEffect } from "react";
import { LocaleSwitcherSelect } from "./locale-switcher-select";
import { useLocaleOptions } from "@/hooks/use-locale-options";
import { useLocaleContext } from "@/context/LanguageProvider";

export const LocaleSwitcher = () => {
  const { locale, items, label } = useLocaleOptions();
  const { localeSelected, onLocaleChange } = useLocaleContext();

  /* Thi is in charge to validate if the locale selected is in the locale options
    this could happen when go to a page with many languages and select one outisede
    the short options available (6), then this will set as locale selected english
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const current = items.find((v) => v.value === localeSelected);
      if (current) return;
      onLocaleChange("en");
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [items, localeSelected]);

  return (
    <LocaleSwitcherSelect defaultValue={locale} items={items} label={label} />
  );
};
