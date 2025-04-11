/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { useAuth } from "@/context/auth";
import { useGetVintage } from "@/hooks/use-get-vintage";
import { Wine } from "@/types/db";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface ExplorerCardProps {
  wine: Wine;
}

export const ExplorerCard = ({ wine }: ExplorerCardProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { vintage } = useGetVintage(wine);
  const router = useRouter();
  const { user } = useAuth();

  // * STATES
  const [liked, setLiked] = useState<boolean>(false);

  const imgContainerRef = useRef<HTMLDivElement>(null);

  // * HANDLERS
  const handleRedirect = () => {
    router.push(`/explore/wine/${wine.id}`);
  };

  // const handleLike = async () => {
  //   setLiked(!liked);
  //   if (liked === false) {
  //     console.log("liked");
  //     await db.wine.update(user?.uid, wine.id, {
  //       likes: wine?.likes + 1,
  //     });
  //   } else {
  //     console.log("unliked");
  //     await db.wine.update(user?.uid, wine.id, {
  //       likes: wine?.likes - 1,
  //     });
  //   }
  // };

  const { generalInfo, profile } = wine;
  const { type: wineType } = generalInfo;

  return (
    <Card
      className="trasnsition flex w-full max-w-[400px] cursor-pointer flex-col items-start justify-start duration-300 ease-in-out hover:scale-[1.02]"
      onClick={handleRedirect}
    >
      <div className="aspect-w-4 aspect-h-4">
        <img
          src={wine.generalInfo.image}
          alt="Product"
          width={400}
          height={400}
          className="rounded-t-lg bg-transparent object-scale-down"
          style={{ aspectRatio: "400/400", objectFit: "contain" }}
        />
        {/* <div className="relative">
          <div
            style={{
              backgroundImage: `url(${wine.generalInfo.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "220px",
              maxHeight: "320px",
              height: "100%",
              width: "auto",
            }}
          />
          <img src={wine.generalInfo.image} alt="" />
          <button
            onClick={handleLike}
            className="z-1 absolute right-4 top-4 flex h-8 w-8 items-center justify-center hover:bg-transparent data-[state=on]:bg-transparent"
          >
            {liked ? (
              <HeartFilled className="text-red-500" />
            ) : (
              <Heart className="text-muted-foreground" />
            )}
          </button>
        </div> */}
      </div>
      <CardHeader className="grid p-4">
        <CardTitle>
          <span className="text-sm font-normal">
            {wine.generalInfo.wineryName}
          </span>
        </CardTitle>
        <CardDescription className="min-h-[48px]">
          <span className="line-clamp-2 text-base font-medium text-foreground">
            {wine.generalInfo.collectionName}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-start gap-2 text-xs text-muted-foreground">
            {wineType && profile ? (
              <p>
                {`${t(`systemVariables.dictSweetness.${profile?.sweetness?.split("-")[0]}.${profile?.sweetness}`)} ${t(`systemVariables.dictWineTypes.${wineType}`)}`}
              </p>
            ) : (
              <span className="text-destructive">Type Not specified</span>
            )}
            <div className="h-1 w-1 rounded-full bg-muted-foreground" />
            <p>{wine.generalInfo.volume}</p>
            <div className="h-1 w-1 rounded-full bg-muted-foreground" />
            <p>{vintage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
