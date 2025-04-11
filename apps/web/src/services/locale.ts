"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale } from "@/i18n/config";
import { LOCATE_COOKIE_NAME } from "../utils/cookieConstants";

export async function getUserLocale() {
  return cookies().get(LOCATE_COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(LOCATE_COOKIE_NAME, locale);
}
