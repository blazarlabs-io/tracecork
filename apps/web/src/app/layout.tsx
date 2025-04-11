import type { Metadata } from "next";
import { Providers } from "../context/providers";
import "@repo/ui/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";
import { initAdmin } from "@/lib/firebase/admin";

export const metadata: Metadata = {
  title: "Tracecork by Blazar Labs",
  description: "Trusted solutions for wine producers worldwide.",
  openGraph: {
    title: "Tracecork by Blazar Labs",
    description: "Trusted solutions for wine producers worldwide.",
    url: "https://tracecork.com/",
    siteName: "tracecork.com",
    images: [
      {
        url: "https://tracecork.com/og.png",
        width: 1080,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracecork by Blazar Labs",
    description: "Trusted solutions for wine producers worldwide.",
    images: ["https://tracecork.com/og.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense>
          <NextIntlClientProvider messages={messages}>
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
