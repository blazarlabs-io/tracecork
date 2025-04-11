import type { Metadata } from "next";
import { PublicLayout } from "@/components/layouts/public-layout";
import { LoadingPage } from "@/components/pages/loading-page";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tracecork by Blazar Labs",
  description: "Trusted solutions for wine producers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicLayout>
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </PublicLayout>
  );
}
