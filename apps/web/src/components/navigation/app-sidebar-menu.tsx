"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@repo/ui/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { useTranslateSidebarMenu } from "@/hooks/use-translate-sidebar-menu";
import { MenuItemType } from "@/types/sidebar";
import { useResponsiveSize } from "@/hooks/use-responsive-size";

export function AppSidebarMenu() {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { toggleSidebar } = useSidebar();
  const { device } = useResponsiveSize();

  // * STATES
  const { data, setData } = useTranslateSidebarMenu();

  const handleActiveSubItems = (tittle: string, selected: MenuItemType) => {
    setData((old) => {
      return old.map((o) => {
        if (o.title === tittle) {
          return {
            ...o,
            isActive: true,
            items: o.items
              ? o.items.map((it) => ({
                  ...it,
                  isActive: it.title === selected.title,
                }))
              : null,
          };
        }
        return {
          ...o,
          isActive: false,
          items: o.items
            ? o.items.map((it) => ({ ...it, isActive: false }))
            : null,
        };
      });
    });
    if (device === "mobile") toggleSidebar();
  };

  const handleActiveItems = (selected: any) => {
    if (selected.title === "Home") {
      setData((old) => {
        return old.map((o) => {
          if (o.title === "Home") {
            return {
              ...o,
              isActive: true,
            };
          }
          return {
            ...o,
            isActive: false,
            items: o.items
              ? o.items.map((it) => ({ ...it, isActive: false }))
              : null,
          };
        });
      });
      if (device === "mobile") toggleSidebar();
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("dashboardGlobalComponents.sideBar.title")}
      </SidebarGroupLabel>
      <SidebarMenu>
        {data.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={item.isActive}
                  onClick={() => handleActiveItems(item)}
                >
                  <Link href={item.url as string | ""}>
                    <div className="flex h-8 items-center gap-2 text-sm">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </div>
                    {!!item.items && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </Link>
                </SidebarMenuButton>
                {/* )} */}
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                          onClick={() =>
                            handleActiveSubItems(item.title, subItem)
                          }
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
