import type { Metadata } from "next";
import { AuthLayout } from "@/components/layouts/auth-layout";

export const metadata: Metadata = {
  title: "Tracecork by Blazar Labs",
  description: "Trusted solutions for wine producers worldwide.",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
