import { getRequestConfig } from "next-intl/server";
import { useSetSanityMessages } from "./hooks/useSetSanityMessages";
import { getUserLocale } from "../services/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const messages = await useSetSanityMessages();

  return {
    locale,
    messages: messages,
  };
});
