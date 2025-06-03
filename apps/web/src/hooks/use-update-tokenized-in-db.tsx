import { useEffect, useRef } from "react";
import { useAuth } from "../context/auth";
import { useTokenizer } from "../context/tokenizer";
import { db } from "../lib/firebase/services/db";
("../services/logger");
import { StatusMonitor, TokenAction } from "../types/db";
import { PanelBottomClose } from "lucide-react";

export const useUpdateTokenizedInDb = (
  statusMonitor: StatusMonitor,
  isTokenized: boolean,
  action: TokenAction,
  updateAction: (action: TokenAction) => void,
) => {
  const { user } = useAuth();
  const { wineId, previousAction } = useTokenizer();

  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    console.log("\n");
    console.log("||||||| STATUS MONITOR |||||||");
    console.log("statusMonitor", statusMonitor);
    console.log("wineId", wineId);
    console.log("type", statusMonitor.tokenType);
    console.log("isTokenized", isTokenized);
    console.log("previousAction", previousAction);
    console.log("action", action);
    if (
      statusMonitor.status === "success" &&
      action === "done" &&
      wineId &&
      user
    ) {
      let newTokenizationData = {};

      db.wine.getOne(user.uid as string, wineId).then((res) => {
        if (previousAction === "create") {
          if (statusMonitor.tokenType === "batch") {
            newTokenizationData = {
              tokenRefId: statusMonitor.refId,
              isTokenized: true,
              txId: statusMonitor.txHash,
              status: "success",
            };

            // console.log("BATCH", newTokenizationData);
          }
          if (statusMonitor.tokenType === "bottle") {
            const btls = res.data.tokenization.bottles || [];
            btls.push(statusMonitor.refId);
            newTokenizationData = {
              ...res.data.tokenization,
              bottles: btls,
            };

            // console.log("BOTTLES", newTokenizationData);
          }

          db.wine
            .update(user.uid as string, wineId, {
              tokenization: {
                ...newTokenizationData,
              },
            })
            .then(() => {
              // console.log("Tokenization done and data updated in DB");
              // updateAction(null);
            })
            .catch((error) => {
              console.error("Tokenization error, could not update DB", error);
            });
        } else if (previousAction === "update") {
          db.wine
            .update(user.uid as string, wineId, {
              tokenization: {
                isTokenized: true,
                status: "success",
                txId: statusMonitor.txHash,
                tokenRefId: statusMonitor.refId,
              },
            })
            .then(() => {
              // console.log("Tokenization done and data updated in DB");
            })
            .catch((error) => {
              console.error("Tokenization error, could not update DB", error);
            });
        } else if (previousAction === "burn") {
          db.wine
            .update(user.uid as string, wineId, {
              tokenization: {
                isTokenized: false,
                status: "success",
                txId: statusMonitor.txHash,
                tokenRefId: statusMonitor.refId,
              },
            })
            .then(() => {
              // console.log("Tokenization done and data updated in DB");
            })
            .catch((error) => {
              console.error("Tokenization error, could not update DB", error);
            });
        }
      });
    } else {
      // console.log("Not updating DB [STANDBY]", statusMonitor);
    }

    // }
  }, [statusMonitor, wineId, isTokenized, user]);
};
