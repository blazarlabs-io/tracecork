"use client";

import { type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";

type NavMainProps = {
  items: {
    title: string;
    url: string;
    icon: typeof LucideIcon;
    isActive?: boolean;
  }[];
  onClick: (title: string) => void;
};

export const NavMain = ({ items, onClick }: NavMainProps) => {
  const router = useRouter();
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            onClick={() => onClick(item.title.toLowerCase())}
          >
            <button onClick={() => router.push(item.url)}>
              <item.icon />
              <span>{item.title}</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
