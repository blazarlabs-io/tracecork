"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@repo/ui/components/ui/sheet";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { Logo } from "../assets/logo";
import { useAuth } from "@/context/auth";
import { Separator } from "@repo/ui/components/ui/separator";
import { LocaleSwitcher } from "@/components/widgets/locale-switcher/locale-switcher";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const NavigationBar = () => {
  const router = useRouter();
  const { t } = useTranslationHandler();
  const { user, singOutUserHandler } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-0 sm:px-2 md:px-4 lg:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle></SheetTitle>
          <SheetClose>
            <Link
              href="/home"
              className="mr-6 flex"
              prefetch={false}
              onClick={() => {
                setOpen(false);
              }}
            >
              <Logo className="" />
            </Link>
          </SheetClose>
          <div className="grid gap-2 py-6">
            <Link
              href="/home"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t("publicComponents.topBar.links.home.label")}
            </Link>
            <Link
              href="/explore"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t("publicComponents.topBar.links.explore.label")}
            </Link>
            <Link
              href="/pricing"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t("publicComponents.topBar.links.pricing.label")}
            </Link>
            <Link
              href="/contact"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t("publicComponents.topBar.links.contact.label")}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex w-full gap-1 items-center justify-between">
        <div className="flex flex-grow items-center gap-1 sm:gap-6">
          <Link href="/home" className="mr-6 hidden lg:flex" prefetch={false}>
            <Logo className="" />
          </Link>
          <Separator
            orientation="vertical"
            className="hidden h-6 w-[1.5px] lg:flex"
          />
          <nav className="hidden sm:gap-1 md:gap-4 lg:gap-6 sm:flex sm:flex-grow">
            <Link
              href="/home"
              className={cn(
                "group inline-flex h-9 sm:w-[90px] md:w-max",
                "items-center justify-center rounded-md bg-white",
                "px-2 md:px-4 py-2 text-sm font-medium transition-colors",
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
                "dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
                "dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50",
              )}
              prefetch={false}
            >
              {t("publicComponents.topBar.links.home.label")}
            </Link>
            <Link
              href="/explore"
              className={cn(
                "group inline-flex h-9 sm:w-[90px] md:w-max",
                "items-center justify-center rounded-md bg-white",
                "px-2 md:px-4 py-2 text-sm font-medium transition-colors",
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
                "dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
                "dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50",
              )}
              prefetch={false}
            >
              {t("publicComponents.topBar.links.explore.label")}
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "group inline-flex h-9 sm:w-[90px] md:w-max",
                "items-center justify-center rounded-md bg-white",
                "px-2 md:px-4 py-2 text-sm font-medium transition-colors",
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
                "dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
                "dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50",
              )}
              prefetch={false}
            >
              {t("publicComponents.topBar.links.pricing.label")}
            </Link>
            <Link
              href="/contact"
              className={cn(
                "group inline-flex h-9 sm:w-[90px] md:w-max",
                "items-center justify-center rounded-md bg-white",
                "px-2 md:px-4 py-2 text-sm font-medium transition-colors",
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
                "dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
                "dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50",
              )}
              prefetch={false}
            >
              {t("publicComponents.topBar.links.contact.label")}
            </Link>
          </nav>
        </div>
        <div className="flex w-fit items-center gap-1 sm:gap-2 md:gap-3 lg:gap-3">
          <LocaleSwitcher />
          {user ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/home">
                  {t("publicComponents.topBar.buttons.backToDashboard.label")}
                </Link>
              </Button>
              {!user.emailVerified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    singOutUserHandler().then(() => {
                      router.replace("/");
                    });
                  }}
                >
                  {t("dashboardGlobalComponents.topBar.dropdown.0.label")}
                </Button>
              )}
            </>
          ) : (
            <div className="flex gap-1 sm:gap-2 md:gap-4">
              <Button
                asChild
                variant="outline"
                size="sm" // Default size
                className="md:size-sm lg:size-lg"
              >
                <Link href="/login" className="">
                  {t("publicComponents.topBar.buttons.logIn.label")}
                </Link>
              </Button>
              <Button
                asChild
                size="sm" // Default size
                className="md:size-sm lg:size-lg"
              >
                <Link href="/signup">
                  {t("publicComponents.topBar.buttons.signUp.label")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
