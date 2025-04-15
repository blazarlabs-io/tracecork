"use client";
/* eslint-disable @next/next/no-img-element */

import { useGetVintage } from "@/hooks/use-get-vintage";
import { Wine, WineNutritionalInfo } from "@/types/db";
import Image from "next/image";
import { NutritionTable } from "@/components/widgets/nutrition-table";
import { useGetWine } from "@/hooks/use-get-wine";
import { DynamicIngredients } from "@/components/widgets/dynamic-ingredients";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import { useTokenizer } from "~/src/context/tokenizer";
import { useEffect, useRef } from "react";
import { useStorageSensorData } from "~/src/hooks/useStorageSensorData";
import { StorageDataChart } from "@/components/charts/storage-data-chart";

export interface WineDetailsPageProps {
  wineId: string;
}

export const WineDetailsPrivatePage = ({ wineId }: WineDetailsPageProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { wine } = useGetWine(wineId);
  const { vintage } = useGetVintage(wine as Wine);
  const { getBatch } = useTokenizer();
  const { sensorData } = useStorageSensorData(wine as Wine, wineId);

  const mountRef = useRef<boolean>(false);

  if (!wine) return;

  const { generalInfo, profile } = wine;
  const { type: wineType } = generalInfo;

  return (
    <>
      {wine && vintage && (
        <>
          <div className="mb-16 flex w-full flex-col items-start justify-start gap-6">
            <div className="aspect-w-4 aspect-h-4 relative mx-auto">
              <img
                src={wine.generalInfo.image}
                alt="Product"
                width={400}
                height={400}
                className="rounded-lg rounded-t-lg object-cover"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
              />
              {wine.tokenization?.isTokenized && (
                <img
                  src="/images/nft-badge.png"
                  alt=""
                  className="absolute right-12 bottom-4"
                />
              )}
            </div>
            <div className="flex w-full flex-col items-center justify-start gap-8 px-4">
              {/* * HEADER */}
              <div className="flex w-full max-w-[640px] flex-col items-center justify-center gap-2 font-bold">
                {wine.generalInfo.collectionName ? (
                  <h1 className="text-center text-2xl font-black">
                    {wine.generalInfo.collectionName}, {vintage}
                  </h1>
                ) : (
                  <h1 className="text-2xl font-black text-destructive">
                    Name Not specified
                  </h1>
                )}
                {wine.generalInfo.wineryName ? (
                  <h2 className="text-lg">{wine.generalInfo.wineryName}</h2>
                ) : (
                  <h2 className="text-lg text-destructive">
                    Winery Name Not specified
                  </h2>
                )}
              </div>
              {/* * GENERAL INFO */}
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <div className="flex w-full items-center justify-center gap-4 text-sm font-semibold text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-1">
                    {wineType && profile ? (
                      <span className="capitalize">
                        {`${t(`systemVariables.dictSweetness.${profile.sweetness?.split("-")[0]}.${profile.sweetness}`)} ${t(`systemVariables.dictWineTypes.${wineType}`)}`}
                      </span>
                    ) : (
                      <span className="text-destructive">
                        Type Not specified
                      </span>
                    )}
                  </div>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <div className="flex flex-col items-center justify-center gap-1">
                    {wine.generalInfo.volume ? (
                      <span>{wine.generalInfo.volume}</span>
                    ) : (
                      <span className="text-destructive">
                        Volume Not specified
                      </span>
                    )}
                  </div>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <div className="flex flex-col items-center justify-center gap-1">
                    {wine.ingredients.alcoholByVolume ? (
                      <span>ABV {wine.ingredients.alcoholByVolume + "%"}</span>
                    ) : (
                      <span className="text-destructive">
                        ABV Not specified
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-full items-center justify-center gap-8 text-sm font-semibold text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {wine.generalInfo.grapeVarieties.length > 0 ? (
                        <>
                          {wine.generalInfo.grapeVarieties.map(
                            (grape, index) => (
                              <div
                                key={grape.name + grape.percentage}
                                className="flex items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <span>{grape.name}</span>
                                  <span>{grape.percentage}%</span>
                                </div>
                                {index <
                                  wine.generalInfo.grapeVarieties.length -
                                    1 && (
                                  <div className="mx-4 h-1 w-1 rounded-full bg-muted-foreground" />
                                )}
                              </div>
                            ),
                          )}
                        </>
                      ) : (
                        <span className="text-destructive">
                          Grapes Not specified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center gap-8 text-sm font-semibold text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex flex-col items-center justify-center gap-1">
                        {wine.generalInfo.country ? (
                          <span>{wine.generalInfo.country}</span>
                        ) : (
                          <span className="text-destructive">
                            Country Not specified
                          </span>
                        )}
                      </div>
                      {wine.generalInfo.cdo && (
                        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                      )}

                      {wine.generalInfo.cdo && (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span>{wine.generalInfo.cdo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* * INGREDIENTS */}
              <div className="mt-8 flex max-w-[640px] flex-col items-start justify-start gap-4 sm:min-w-[320px] md:min-w-[640px]">
                <h2 className="text-base font-bold">
                  {t("wineStepper.previewWine.ingredientsTitle")}
                </h2>
                <DynamicIngredients wine={wine} />
              </div>
              {/* * NUTRITION INFORMATION */}
              <NutritionTable
                data={wine.nutritionalInfo as WineNutritionalInfo}
                sugar={wine.ingredients.sugar}
                abv={wine.ingredients.alcoholByVolume as string}
                volume={wine.generalInfo.volume}
              />
              {/* * STORAGE DATA VIZ */}
              {wine.tokenization?.isTokenized && sensorData && (
                <div className="w-full max-w-[640px]">
                  <StorageDataChart data={sensorData} />
                </div>
              )}

              {/* * WARNINGS */}
              <div className="max-w-[520px] p-8">
                <Image
                  src="/images/warnings.png"
                  alt="warnings"
                  width={640}
                  height={64}
                  className="w-full"
                />
              </div>
              <div className="max-w-[640px]">
                <MarkdownPreviewer
                  content={t("wineStepper.previewWine.drinkResponsiblyText")}
                />
                {/* <span>
                  <span className="font-bold">Please Drink Responsibly:</span>{" "}
                  We encourage you to enjoy the beverages with mindfulness and
                  moderation.
                </span> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
