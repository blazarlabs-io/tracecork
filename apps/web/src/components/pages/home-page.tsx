"use client";

import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { useAuth } from "@/context/auth";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import "./home-page-styles.css";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const HomePage = () => {
  const { device } = useResponsiveSize();
  const { user } = useAuth();
  const { t } = useTranslationHandler();

  return (
    <>
      {device === "desktop" && (
        <div className="mb-[64px] flex w-full flex-col gap-[48px]">
          <section className="flex h-full w-full flex-col px-48 py-16">
            <div className="grid w-full grid-cols-2 items-center justify-center gap-16">
              <div className="">
                <h1 className="text-5xl font-medium leading-[64px] header-style">
                  <MarkdownPreviewer
                    content={t("publicPages.homePage.headline")}
                  />
                </h1>
                <p className="py-6 text-xl font-normal text-muted-foreground">
                  {t("publicPages.homePage.subHeadline")}
                </p>
                <Button size="lg" asChild>
                  <Link href={user ? "/dashboard/home" : "/signup"}>
                    {t("publicPages.homePage.buttonLabel")}
                  </Link>
                </Button>
              </div>
              <div className="relative flex justify-end">
                <Image
                  src="/images/hero-image.png"
                  alt="Hero image"
                  width={496}
                  height={300}
                />
              </div>
            </div>
          </section>
          {/* <section className="flex h-full w-full flex-col items-center justify-center gap-[32px]">
            <h2 className="text-3xl font-medium leading-[64px]">
              Companies that work with us
            </h2>
            <div className="flex items-center justify-center gap-10">
              <Image
                src="/images/client-logo-1.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-2.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-3.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-4.svg"
                alt="Logo"
                width={140}
                height={32}
              />
            </div>
          </section> */}
        </div>
      )}
      {device === "tablet" && (
        <div className="mb-[64px] flex w-full flex-col gap-[48px]">
          <section className="flex h-full w-full flex-col px-24 py-16">
            <div className="grid w-full grid-cols-2 items-center justify-center gap-16">
              <div className="">
                <h1 className="text-4xl font-medium leading-[48px] header-style">
                  <MarkdownPreviewer
                    content={t("publicPages.homePage.headline")}
                  />
                </h1>
                <p className="w-full py-6 text-lg font-normal text-muted-foreground">
                  {t("publicPages.homePage.subHeadline")}
                </p>

                <Button size="lg">
                  <Link href={user ? "/dashboard/home" : "/signup"}>
                    {t("publicPages.homePage.buttonLabel")}
                  </Link>
                </Button>
              </div>
              <div className="relative flex justify-end">
                <Image
                  src="/images/hero-image.png"
                  alt="Hero image"
                  width={496}
                  height={300}
                />
              </div>
            </div>
          </section>
          {/* <section className="flex h-full w-full flex-col items-center justify-center gap-[32px]">
            <h2 className="text-3xl font-medium leading-[64px]">
              Companies that work with us
            </h2>
            <div className="flex items-center justify-center gap-10">
              <Image
                src="/images/client-logo-1.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-2.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-3.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-4.svg"
                alt="Logo"
                width={140}
                height={32}
              />
            </div>
          </section> */}
        </div>
      )}
      {device === "mobile" && (
        <div className="mb-[64px] flex w-full flex-col gap-[48px] px-4">
          <section className="flex h-full w-full flex-col">
            <div className="flex w-full justify-center">
              <Image
                src="/images/hero-image.png"
                alt="Hero image"
                width={640}
                height={300}
              />
            </div>
            <div className="mt-6 w-full">
              <h1 className="text-4xl font-medium leading-[44px] header-style">
                <MarkdownPreviewer
                  content={t("publicPages.homePage.headline")}
                />
              </h1>
              <p className="py-6 text-xl font-normal text-muted-foreground">
                {t("publicPages.homePage.subHeadline")}
              </p>
              <Button size="lg">
                <Link href={user ? "/dashboard/home" : "/signup"}>
                  {t("publicPages.homePage.buttonLabel")}
                </Link>
              </Button>
            </div>
          </section>
          {/* <section className="flex h-full w-full flex-col items-center justify-center gap-[32px]">
            <h2 className="text-[26px] font-medium">
              Companies that work with us
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Image
                src="/images/client-logo-1.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-2.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-3.svg"
                alt="Logo"
                width={140}
                height={32}
              />
              <Image
                src="/images/client-logo-4.svg"
                alt="Logo"
                width={140}
                height={32}
              />
            </div>
          </section> */}
        </div>
      )}
    </>
  );
};
