"use client";

import Link from "next/link";
import { Logo } from "../assets/logo";
import { Separator } from "@repo/ui/components/ui/separator";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const Footer = () => {
  const { t } = useTranslationHandler();
  const { device } = useResponsiveSize();

  return (
    <>
      {device === "mobile" && (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Separator className="w-full" />
          <footer className="mt-4 flex h-16 w-full items-start justify-between px-8">
            <div className="-mt-2 flex flex-col items-center">
              <Link href="/home" className="" prefetch={false}>
                <Logo className="h-8" />
              </Link>
              <span className="mt-2 text-xs">
                {t("publicComponents.footer.copyright")}
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              {/* <Link href="/explore" className="text-sm">
                Explore
              </Link>
              <Link href="/pricing" className="text-sm">
                Pricing
              </Link>
              <Link href="/contact" className="text-sm">
                Contact Us
              </Link> */}
              <Link href="/legal/terms-and-conditions" className="text-xs">
                {t("publicComponents.footer.links.termsAndConditions.label")}
              </Link>
              <Link href="/legal/terms-and-conditions" className="text-xs">
                {t("publicComponents.footer.links.privacyPolicy.label")}
              </Link>
            </div>
          </footer>
        </div>
      )}
      {device === "desktop" && (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Separator className="w-full" />
          <footer className="mt-4 flex h-16 w-full items-start justify-between gap-48 px-8">
            <div className="-mt-2 flex items-center gap-3">
              <Link href="/home" className="hidden xl:flex" prefetch={false}>
                <Logo className="" />
              </Link>
              <span className="mt-2 text-xs">
                {t("publicComponents.footer.copyright")}
              </span>
            </div>
            <div className="flex items-start gap-8">
              <Link href="/explore" className="text-sm">
                {t("publicComponents.footer.links.explore.label")}
              </Link>
              <Link href="/pricing" className="text-sm">
                {t("publicComponents.footer.links.pricing.label")}
              </Link>
              <Link href="/contact" className="text-sm">
                {t("publicComponents.footer.links.contact.label")}
              </Link>
              <Link href="/legal/terms-and-conditions" className="text-sm">
                {t("publicComponents.footer.links.termsAndConditions.label")}
              </Link>
              <Link href="/legal/terms-and-conditions" className="text-sm">
                {t("publicComponents.footer.links.privacyPolicy.label")}
              </Link>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};
