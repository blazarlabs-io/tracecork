import { useEffect, useRef } from "react";
import { useAuth } from "../context/auth";
import { useTokenizer } from "../context/tokenizer";
import { db } from "../lib/firebase/services/db";
import tk from "../services/logger";
import { StatusMonitor, TokenAction } from "../types/db";

export const useUpdateTokenizedInDb = (
  statusMonitor: StatusMonitor,
  isTokenized: boolean,
  action: TokenAction,
  updateAction: (action: TokenAction) => void,
) => {
  const { user } = useAuth();
  const { wineId } = useTokenizer();

  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    tk.log("\n");
    tk.log("||||||| STATUS MONITOR |||||||");
    tk.log("statusMonitor", statusMonitor);
    tk.log("wineId", wineId);
    tk.log("isTokenized", isTokenized);
    tk.log("action", action);
    if (
      statusMonitor.status === "success" &&
      action === "done" &&
      wineId &&
      user
    ) {
      // * We update the database with the latest TX ID
      tk.log(
        "Updating DB with tokenization data...",
        statusMonitor,
        isTokenized,
      );
      db.wine
        .update(user.uid as string, wineId, {
          tokenization: {
            isTokenized: isTokenized,
            tokenRefId: statusMonitor.refId,
            txId: statusMonitor.txHash,
          },
        })
        .then(() => {
          tk.log("Tokenization done and data updated in DB");
          updateAction(null);
        })
        .catch((error) => {
          tk.error("Tokenization error, could not update DB", error);
        });
    } else {
      tk.log("Not updating DB [STANDBY]", statusMonitor);
    }
    tk.log("||||||||||||||||||||||||||||||");
    tk.log("\n");
    // }
  }, [statusMonitor, wineId, isTokenized, user]);
};
