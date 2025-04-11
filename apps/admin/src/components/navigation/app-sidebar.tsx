"use client";

import { Separator } from "@repo/ui/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar";
import * as React from "react";
import { useNavigation } from "../../context/navigation";
import { Logo } from "../ui/logo";
import { NavMain } from "./nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // * STATES
  const { sidebarItems, updateSidebarItems } = useNavigation();

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="py-2">
          <Logo />
        </div>
      </SidebarHeader>
      <div className="px-3">
        <Separator />
      </div>
      <SidebarContent>
        <div className="px-2 mt-4">
          <NavMain
            items={sidebarItems}
            onClick={(title) => {
              console.log(title);
              updateSidebarItems(
                sidebarItems.map((item) => {
                  return {
                    ...item,
                    isActive: item.title.toLowerCase() === title,
                  };
                }),
              );
            }}
          />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
