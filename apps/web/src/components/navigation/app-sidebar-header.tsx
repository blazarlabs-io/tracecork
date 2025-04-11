"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Separator } from "@repo/ui/components/ui/separator";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { useAuth } from "@/context/auth";
import { useWinery } from "@/context/winery";
import { auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { LocaleSwitcher } from "../widgets/locale-switcher/locale-switcher";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { cn } from "@repo/ui/lib/utils";
import { AUTH_COOKIE } from "@/utils/cookieConstants";
import { deleteCookie } from "cookies-next";
import { helix } from "ldrs";

helix.register();

export function AppSidebarHeader() {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user, singOutUserHandler } = useAuth();
  const { winery } = useWinery();
  const router = useRouter();

  // * HANDLERS
  const handleSignOut = async () => {
    await singOutUserHandler();
    router.replace("/home");
  };

  return (
    <header
      className={cn(
        "flex h-16 w-full shrink-0 items-center sm:gap-2",
        "transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
      )}
    >
      <div className="flex w-fit sm:w-full items-center sm:gap-2 px-2 sm:px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-6" />
      </div>
      <div
        className={cn(
          "flex h-full w-full items-center justify-end",
          "gap-0 sm:gap-2 md:gap-3 lg:gap-4",
          "pr-1 sm:pr-2 lg:pr-4",
        )}
      >
        {/*  */}
        {/* <div className="flex items-center gap-1 border px-3 py-2 rounded-full">
          <l-helix size="16" speed="2.0" color="#333"></l-helix>
          <p className="text-xs">Tokenizing...</p>
        </div>
        <Separator orientation="vertical" className="h-6" /> */}
        {/*  */}
        <LocaleSwitcher />
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/explore")}
        >
          {t("dashboardGlobalComponents.topBar.buttons.exploreWines.label")}
        </Button>
        <Separator orientation="vertical" className="h-6" />
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer border">
                <AvatarImage src={winery?.info?.avatar as string} />
                <AvatarFallback className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-[#86F096] text-primary-foreground">
                  {user.displayName?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut />
                  {t("dashboardGlobalComponents.topBar.dropdown.0.label")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
