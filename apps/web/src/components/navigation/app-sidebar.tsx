"use client";

import { Logo } from "@/components/assets/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar";
import Link from "next/link";

import { AppSidebarMenu } from "./app-sidebar-menu";
import { AppSidebarHeader } from "./app-sidebar-header";

// Menu items.
const dataLogo = {
  brand: {
    name: "Tracecork",
    logo: Logo,
    by: "By Blazar Labs",
  },
};
export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas" className="overflow-hidden">
        <SidebarHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-lg p-2 text-sidebar-primary-foreground">
              <Link href="/">
                <dataLogo.brand.logo />
              </Link>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <AppSidebarMenu />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <AppSidebarHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
