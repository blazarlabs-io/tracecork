"use client";

import { Footer } from "@/components/navigation/footer";
import { NavigationBar } from "@/components/navigation/navigation-bar";
import { usePathname } from "next/navigation";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <NavigationBar />
      <main className="flex min-h-[calc(100vh-80px)] w-full items-start justify-center">
        {children}
      </main>
      {!pathname.startsWith("/legal") && <Footer />}
    </div>
  );
};
