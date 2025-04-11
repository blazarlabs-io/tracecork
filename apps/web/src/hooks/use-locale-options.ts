import { usePathname } from "next/navigation";
import { useTranslationHandler } from "./use-translation-handler";
import { useEffect, useMemo, useState } from "react";

export const useLocaleOptions = () => {
  const { locale, msg } = useTranslationHandler();
  const pathname = usePathname();
  const [isFullLang, setIsFullLang] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsFullLang(pathname.includes("/explore/wine"));
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  const items = useMemo(() => {
    if (!msg["language"] || typeof msg["language"] === "string") return [];
    const commongLang = msg["language"]["common-lang"];
    if (isFullLang) {
      const fullLang = msg["language"]["all-lang"];
      if (!fullLang || typeof fullLang === "string") return [];
      if (!Array.isArray(fullLang)) return [];
      return fullLang.map((v) => ({ value: v, label: v }));
    }
    if (!commongLang || typeof commongLang === "string") return [];
    if (!Array.isArray(commongLang)) return [];
    return commongLang.map((v) => ({ value: v, label: v }));
  }, [msg["language"], isFullLang]);

  const label = useMemo(() => {
    if (!msg["language"] || typeof msg["language"] === "string")
      return "Language";
    const { label } = msg["language"];
    if (!label || typeof label != "string") return "Language";
    return label;
  }, [msg["language"]]);

  return { locale, items, label };
};
