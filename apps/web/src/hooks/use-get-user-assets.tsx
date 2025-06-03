import { useEffect, useRef, useState } from "react";
import { Wine } from "@/types/db";
("@/services/logger");

export const useGetUserAssets = (walletAssets: any, wines: Wine[]) => {
  const [assets, setAssets] = useState<any>([]);
  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    if (!mountRef.current && walletAssets && wines) {
      //   mountRef.current = true;
      //   const filteredAssets = walletAssets.filter((asset: any) => {
      //     return wines.some((wine: Wine) => {
      //       console.log(
      //         "asset_name",
      //         asset.asset_name,
      //         "wine.tokenization?.tokenRefId",
      //         wine.tokenization,
      //       );
      //       return (
      //         asset.asset_name === wine.tokenization?.tokenRefId.split(".")[1]
      //       );
      //     });
      //   });
      const filteredAssets = walletAssets.map((asset: any) => {
        wines.map((wine: Wine) => {
          if (
            asset.asset_name === wine.tokenization?.tokenRefId.split(".")[1]
          ) {
            console.log(
              "asset.asset_name",
              asset.asset_name,
              "wine.tokenization?.tokenRefId",
              wine.tokenization?.tokenRefId.split(".")[1],
            );
          }
        });
      });
      //   setAssets(filteredAssets);
      //   console.log("filteredAssets", filteredAssets);
    }
  }, [walletAssets, wines]);
  return { assets };
};
