import { ChevronRight, Grape, Home, Settings, UserPen } from "lucide-react";
import { useTranslationHandler } from "./use-translation-handler";
import { useEffect, useState } from "react";
import { MenuType } from "../types/sidebar";

// Menu items.
const dataTemplate: MenuType[] = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
    items: null,
    isActive: true,
  },
  {
    title: "My Winery",
    url: "#",
    icon: Grape,
    isActive: false,
    items: [
      {
        title: "Winery Details",
        url: "/dashboard/winery-details",
        isActive: false,
      },
      {
        title: "My Wines",
        url: "/dashboard/my-wines",
        isActive: false,
      },
    ],
  },
  {
    title: "My Account",
    url: "#",
    icon: UserPen,
    isActive: false,
    items: [
      {
        title: "Subscription",
        url: "/dashboard/subscription",
        isActive: false,
      },
      {
        title: "Manage Account",
        url: "/dashboard/manage-account",
        isActive: false,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    isActive: false,
    items: [
      {
        title: "General Settings",
        url: "/dashboard/general-settings",
        isActive: false,
      },
    ],
  },
];

export const useTranslateSidebarMenu = () => {
  const { t } = useTranslationHandler();
  const setMenuTraslation = (data: MenuType[]) => {
    return data.map((d, i) => {
      d.title = t(`dashboardGlobalComponents.sideBar.items.${i}.label`);
      if (d.items) {
        d.items = d.items.map((item, j) => {
          return {
            ...item,
            title: t(
              `dashboardGlobalComponents.sideBar.items.${i}.subItems.${j}.label`,
            ),
          };
        });
      }
      return d;
    });
  };
  const [data, setData] = useState<MenuType[]>(setMenuTraslation(dataTemplate));

  return { data, setData };
};
