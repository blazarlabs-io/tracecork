"use client";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { Home, UsersRound } from "lucide-react";
import { Grape } from "lucide-react";

type SidebarItems = {
  title: string;
  url: string;
  icon: any;
  isActive: boolean;
};

export interface NavigationContextInterface {
  sidebarItems: SidebarItems[];
  updateSidebarItems: (items: SidebarItems[]) => void;
}

const contextInitialData: NavigationContextInterface = {
  sidebarItems: [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Wineries",
      url: "/dashboard/wineries",
      icon: Grape,
      isActive: false,
    },
  ],
  updateSidebarItems: () => {},
};

const NavigationContext = createContext(contextInitialData);

export const useNavigation = (): NavigationContextInterface => {
  const context = useContext<NavigationContextInterface>(NavigationContext);

  if (context === undefined) {
    throw new Error(
      "use Provider Navigation must be used as within a Provider",
    );
  }

  return context;
};

export const NavigationProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [sidebarItems, setSidebarItems] = useState<SidebarItems[]>(
    contextInitialData.sidebarItems,
  );

  const updateSidebarItems = (items: SidebarItems[]) => {
    setSidebarItems(items);
    console.log(items);
  };

  const value = { sidebarItems, updateSidebarItems };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
