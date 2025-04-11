/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";

import { SecurePublishWineDialog } from "@/components/dialogs/secure-publish-wine-dialog";
import { WineForm } from "@/components/forms/wine-form";
import { DraftIcon } from "@/components/icons/draft";
import { PublishedIcon } from "@/components/icons/published";
import { PageHeader } from "@/components/layouts/page-header";
import { useHandleWineToEdit } from "@/hooks/use-handle-wine-to-edit";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { cn } from "@/utils/shadcn";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { defineStepper } from "@stepperize/react";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { WinePreview } from "./wine-preview";
import { WinePublish } from "./wine-publish";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface WineStepperProps {
  wineId: string;
  selectedStep: "editor" | "preview" | "publish" | null;
}

export const WineStepper = ({ wineId, selectedStep }: WineStepperProps) => {
  // * HOOKS
  const { t, locale } = useTranslationHandler();
  const baseStepps = useMemo(() => {
    return [
      {
        id: "editor",
        title: t("wineStepper.wineryDetails.headline"),
        description: t("wineStepper.wineryDetails.subHeadline"),
        index: 0,
      },
      {
        id: "preview",
        title: t("wineStepper.previewWine.headline"),
        description: t("wineStepper.previewWine.subHeadline"),
        index: 1,
      },
      {
        id: "publish",
        title: t("wineStepper.publishWine.headline"),
        description: t("wineStepper.publishWine.subHeadline"),
        index: 2,
      },
    ];
  }, [t, locale]);

  const { useStepper, steps } = defineStepper(...baseStepps);

  const router = useRouter();
  const { wine } = useHandleWineToEdit(wineId);
  const stepper = useStepper();
  const { device } = useResponsiveSize();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-2">
          <span className="text-sm">
            {`${t("wineStepper.currentStep")} ${stepper.current.index + 1} / ${steps.length}`}
          </span>
          <PageHeader
            title={baseStepps[stepper.current.index]?.title || "NA"}
            subtitle={baseStepps[stepper.current.index]?.description || "NA"}
          />
        </div>
        {wine && (
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              {wine.status === "draft" ? (
                <>
                  <DraftIcon className="h-3 w-3" />
                </>
              ) : (
                <>
                  <PublishedIcon className="h-3 w-3" />
                </>
              )}
              <span className="text-sm capitalize">{wine.status}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(wine.lastUpdated?.seconds * 1000).toDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
      <ol
        className="flex w-full items-center justify-between gap-2"
        aria-orientation="horizontal"
      >
        {stepper.all.map((step, index, array) => (
          <React.Fragment key={step.id}>
            <li
              className={cn(
                "flex flex-shrink-0 items-center flex-1 sm:flex-grow-0",
                "gap-1 sm:gap-2 md:gap-3 lg:gap-4",
                device === "mobile" ? "flex-col" : "flex-row",
              )}
            >
              <Button
                type="button"
                role="tab"
                variant={
                  index <= stepper.current.index ? "default" : "secondary"
                }
                aria-current={
                  stepper.current.id === step.id ? "step" : undefined
                }
                aria-posinset={index + 1}
                aria-setsize={steps.length}
                aria-selected={stepper.current.id === step.id}
                className="flex size-10 items-center justify-center rounded-full"
                onClick={() => stepper.goTo(step.id)}
              >
                {index + 1}
              </Button>
              <span className="text-sm font-medium w-[60px] text-center sm:text-start sm:w-[90px] lg:w-[110px]">
                {baseStepps[index]?.title}
              </span>
            </li>
            {index < array.length - 1 && (
              <Separator
                className={`flex-1 ${
                  index < stepper.current.index ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </ol>
      <Separator className="w-full" />
      <div className="w-full space-y-4">
        {stepper.switch({
          editor: () => wine && <WineForm wine={wine} />,
          preview: () => <WinePreview wineId={wineId} />,
          publish: () => wine && <WinePublish wine={wine} />,
        })}
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              {t("wineStepper.wineryDetails.buttons.backButtonLabel")}
            </Button>
            <Button onClick={stepper.next}>
              {stepper.isLast
                ? "Complete"
                : t("wineStepper.wineryDetails.buttons.nextButtonLabel")}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <Button size="lg" variant="outline" onClick={stepper.reset}>
              {t("wineStepper.publishWine.buttonLabels.backButtonLabel")}
            </Button>
            {wine && (
              <SecurePublishWineDialog
                uid={wine.uid}
                wineId={wine.id}
                isReadytoPublish={wine.isReadyToPublish}
                collectionName={wine.generalInfo.collectionName}
                onAction={(state: string) => {
                  if (state === "MissingFieldsDialog") {
                    stepper.goTo("editor");
                  } else if (state === "PublishNewWineDialog") {
                    router.replace("/dashboard/my-wines");
                  } else if (state === "PublishOldWineDialog") {
                    router.replace("/dashboard/my-wines");
                  }
                }}
              >
                <div className="flex min-h-10 min-w-32 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/80">
                  {t("wineStepper.publishWine.buttonLabels.publishButtonLabel")}
                </div>
              </SecurePublishWineDialog>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
