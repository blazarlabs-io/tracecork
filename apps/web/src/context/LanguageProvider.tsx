"use client";

// LIBS
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { getUserLocale, setUserLocale } from "../services/locale";
import { Locale } from "../i18n/config";

export interface LocaleProviderInterface {
  isPending: boolean;
  localeSelected: string;
  onLocaleChange: (value: string) => void;
}

const contextInitialData: LocaleProviderInterface = {
  isPending: false,
  localeSelected: "",
  onLocaleChange: () => {},
};

const LocaleContext = createContext(contextInitialData);

export const useLocaleContext = () => {
  const context = useContext<LocaleProviderInterface>(LocaleContext);

  if (context === undefined) {
    throw new Error("use Locale Provider must be used as within a Provider");
  }

  return context;
};

export const LocaleProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const initRef: any = useRef();
  const [isPending, startTransition] = useTransition();
  const [localeSelected, setLocaleSelected] = useState("");

  useEffect(() => {
    if (initRef.current) return;
    const timeoutId = setTimeout(async () => {
      const locale = await getUserLocale();
      setLocaleSelected(locale);
      initRef.current = true;
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  function onLocaleChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
      setLocaleSelected(locale);
    });
  }

  return (
    <LocaleContext.Provider
      value={{ isPending, localeSelected, onLocaleChange }}
    >
      {children}
    </LocaleContext.Provider>
  );
};
