export type MenuItemType = {
  title: string;
  url: string;
  isActive: boolean;
};

export type MenuType = {
  title: string;
  url: string;
  icon: any;
  items: MenuItemType[] | null;
  isActive: boolean;
};
