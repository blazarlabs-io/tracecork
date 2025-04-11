import { PrivateLayout } from "@/components/layouts/private-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracecork by Blazar Labs",
  description: "Trusted solutions for wine producers worldwide.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
