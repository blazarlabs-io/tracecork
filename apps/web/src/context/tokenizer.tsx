"use client";

// LIBS
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Batch, StatusMonitor, StatusTimer, TokenAction } from "../types/db";
("../services/logger");
import { db } from "../lib/firebase/services/db";
import { useAuth } from "./auth";

export interface TokenizerContextInterface {
  tokenizing: boolean;
  updateTokenizing: (tokenizing: boolean) => void;
  tokenizeBatch: (data: any, cb: (data: any) => void) => void;
  batch: Batch | null;
  batchDetails: any;
  getBatch: (batchId: string) => void;
  updateBatchToken: (
    tokenId: string,
    batch: any,
    cb: (data: any) => void,
  ) => void;
  burnBatchToken: (
    tokenId: string,
    wineId: string,
    cb: (data: any) => void,
  ) => void;
  tokenizeBottle: (id: string, data: any, cb: (data: any) => void) => void;
  action: TokenAction;
  previousAction: TokenAction;
  updateAction: (action: TokenAction) => void;
  statusMonitor: StatusMonitor;
  statusTimer: StatusTimer;
  wineId: string | null;
}

const contextInitialData: TokenizerContextInterface = {
  tokenizing: false,
  updateTokenizing: () => {},
  tokenizeBatch: () => {},
  batch: null,
  batchDetails: null,
  getBatch: () => {},
  updateBatchToken: () => {},
  burnBatchToken: () => {},
  tokenizeBottle: () => {},
  action: null,
  previousAction: null,
  updateAction: () => {},
  statusMonitor: {
    status: "idle",
    tokenType: null,
    message: "Not started",
    txHash: null,
    refId: null,
  },
  statusTimer: null,
  wineId: null,
};

const TokenizerContext = createContext(contextInitialData);

export const useTokenizer = (): TokenizerContextInterface => {
  const context = useContext<TokenizerContextInterface>(TokenizerContext);

  if (context === undefined) {
    throw new Error("use Provider Tokenizer must be used as within a Provider");
  }

  return context;
};

export const TokenizerProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [tokenizing, setTokenizing] = useState<
    TokenizerContextInterface["tokenizing"]
  >(contextInitialData.tokenizing);
  const [batch, setBatch] = useState<TokenizerContextInterface["batch"]>(
    contextInitialData.batch,
  );
  const [batchDetails, setBatchDetails] = useState<
    TokenizerContextInterface["batchDetails"]
  >(contextInitialData.batchDetails);
  const [action, setAction] = useState<TokenizerContextInterface["action"]>(
    contextInitialData.action,
  );
  const [previousAction, setPreviousAction] = useState<
    TokenizerContextInterface["previousAction"]
  >(contextInitialData.previousAction);
  const [statusMonitor, setStatusMonitor] = useState<
    TokenizerContextInterface["statusMonitor"]
  >(contextInitialData.statusMonitor);
  const [statusTimer, setStatusTimer] = useState<
    TokenizerContextInterface["statusTimer"]
  >(contextInitialData.statusTimer);
  const [wineId, setWineId] = useState<TokenizerContextInterface["wineId"]>(
    contextInitialData.wineId,
  );

  const { user } = useAuth();

  const updateTokenizing = (state: boolean) => {
    setTokenizing(state);
  };

  // * ///////////////// BATCH ///////////////////

  const getBatch = (batchId: string) => {
    // setAction("get");
    console.log(
      "TOKENIZATION URL",
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/wine/${batchId}`,
    );
    fetch(`${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/wine/${batchId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            process.env.NEXT_PUBLIC_TOKENIZATION_USERNAME +
              ":" +
              process.env.NEXT_PUBLIC_TOKENIZATION_PASSWORD,
          ),
      },
    })
      .then(async (res) => {
        const data = await res.json();
        // console.log("GET BATCH RESULTS:", data);
        setBatchDetails(data);
      })
      .catch((error) => {
        console.error("Error getting batch", error);
        setBatchDetails(null);
      });
  };

  const updateAction = (action: TokenAction) => {
    setAction(action);
    setPreviousAction(action);
  };

  const tokenizeBatch = useCallback(
    (data: any, cb: (cbData: any) => void) => {
      const wineInfo = JSON.parse(data.batch_data.info);
      const mdata = JSON.parse(data.batch_data.info).id;
      setWineId(() => mdata);
      setTokenizing(true);
      setAction("create");
      setPreviousAction("create");

      console.log("\n\nXXXXXXXXXXXXXXXXXX");
      console.log("WINE INFO", wineInfo);
      console.log("TOKENIZE BATCH DATA", data);
      console.log(
        "TOKENIZATION URL",
        `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/false/mint-batch`,
      );
      console.log("XXXXXXXXXXXXXXXXXX\n\n");

      fetch(
        `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/false/mint-batch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              btoa(
                process.env.NEXT_PUBLIC_TOKENIZATION_USERNAME +
                  ":" +
                  process.env.NEXT_PUBLIC_TOKENIZATION_PASSWORD,
              ),
          },
          body: JSON.stringify(data),
        },
      )
        .then(async (res) => {
          const resData = await res.json();
          // * Update status monitor
          setStatusMonitor(() => {
            return {
              status: "tokenizing",
              tokenType: "batch",
              message:
                "Tokenizing batch data. We will notify you when it's done.",
              txHash: resData.txId,
              refId: resData.tokenRefId,
            };
          });
          // * Update DB
          await db.wine.update(user?.uid as string, wineInfo.id, {
            tokenization: {
              tokenized: true,
              tokenRefId: resData.tokenRefId,
              txId: resData.txId,
              status: "tokenizing",
            },
          });
          setBatch(resData);
          // console.log("TOKENIZE BATCH RESULT / resData:", resData);
          cb(resData);
        })
        .catch((error) => {
          console.error("Error tokenizing batch", error);
          setStatusMonitor((prev) => {
            return {
              status: "error",
              tokenType: "batch",
              message: "Error tokenizing batch",
              txHash: prev.txHash,
              refId: prev.refId,
            };
          });
          cb(error);
        });
    },
    [statusMonitor],
  );

  const updateBatchToken = (
    tokenId: string,
    batch: any,
    cb: (data: any) => void,
  ) => {
    setAction("update");
    setPreviousAction("update");
    setTokenizing(true);

    const wineData = JSON.parse(batch.batch_data.info);
    const mdata = JSON.parse(batch.batch_data.info).id;
    setWineId(() => mdata);
    console.log("\n\nXXXXXXXXXXXXXXXXXX");
    console.log("TOKEN ID", tokenId);
    console.log("WINE DATA", wineData);
    console.log("UPDATE BATCH DATA", batch);
    console.log(
      "TOKENIZATION URL",
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/false/update-batch/${tokenId}`,
    );
    console.log("XXXXXXXXXXXXXXXXXX\n\n");
    fetch(
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/false/update-batch/${tokenId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              process.env.NEXT_PUBLIC_TOKENIZATION_USERNAME +
                ":" +
                process.env.NEXT_PUBLIC_TOKENIZATION_PASSWORD,
            ),
        },
        body: JSON.stringify(batch),
      },
    )
      .then(async (res) => {
        const data = await res.json();
        setStatusMonitor(() => {
          return {
            status: "updating",
            tokenType: "batch",
            message:
              "Your batch data is being updated. We will notify you when it is complete.",
            txHash: data.txId,
            refId: tokenId, //data.tokenRefId,
          };
        });

        // * Update DB
        await db.wine.update(user?.uid as string, wineData.id, {
          tokenization: {
            tokenized: true,
            txHash: data.txId,
            refId: tokenId,
            status: "updating",
          },
        });

        setBatch(data);
        cb(data);
      })
      .catch((error) => {
        console.log("Error updating batch", error);
        setStatusMonitor((prev) => {
          return {
            status: "error",
            tokenType: "batch",
            message: "Error updating batch",
            txHash: prev.txHash,
            refId: prev.refId,
          };
        });
        cb(error);
      });
  };

  const burnBatchToken = (
    tokenId: string,
    wineId: string,
    cb: (data: any) => void,
  ) => {
    // console.log(tokenId);
    setAction("burn");
    setPreviousAction("burn");
    setTokenizing(true);
    setWineId(() => wineId);

    fetch(
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/false/burn-ref/${tokenId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              process.env.NEXT_PUBLIC_TOKENIZATION_USERNAME +
                ":" +
                process.env.NEXT_PUBLIC_TOKENIZATION_PASSWORD,
            ),
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        // setTokenizing(false);

        const wineData = await db.wine.getSingle(wineId);

        // * Update status monitor
        setStatusMonitor((prev) => {
          return {
            status: "burning",
            tokenType: "batch",
            message:
              "Your batch data is being burned. We will notify you when it is complete.",
            txHash: wineData?.data.tokenization.txId,
            refId: wineData?.data.tokenization.tokenRefId,
          };
        });
        // * Update DB
        await db.wine.update(user?.uid as string, wineId, {
          tokenization: {
            tokenized: true,
            txHash: wineData?.data.tokenization.txId,
            refId: wineData?.data.tokenization.tokenRefId,
            status: "burning",
          },
        });
        setBatch(data);
        cb(data);
      })
      .catch((error) => {
        // setTokenizing(false);
        console.error("Error burning batch", error);
        setStatusMonitor((prev) => {
          return {
            status: "error",
            tokenType: "batch",
            message: "Error burning batch",
            txHash: prev.txHash,
            refId: prev.refId,
          };
        });
        cb(error);
      });
  };

  // * ///////////////// BOTTLES ///////////////////

  const tokenizeBottle = (id: string, data: any, cb: (data: any) => void) => {
    setTokenizing(true);
    fetch(
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/false/mint-bottle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              process.env.NEXT_PUBLIC_TOKENIZATION_USERNAME +
                ":" +
                process.env.NEXT_PUBLIC_TOKENIZATION_PASSWORD,
            ),
        },
        body: JSON.stringify(data),
      },
    )
      .then(async (res) => {
        const data = await res.json();
        // setTokenizing(false);
        setStatusMonitor((prev) => {
          return {
            status: "tokenizing",
            tokenType: "bottle",
            message:
              "Your bottle is being tokenized. We will notify you when it is complete.",
            txHash: data.txId,
            refId: data.tokenRefId,
          };
        });
        // * Update DB
        await db.wine.update(user?.uid as string, id, {
          tokenization: {
            tokenized: true,
            txHash: data.txId,
            refId: data.tokenRefId,
            status: "tokenizing",
          },
        });
        cb(data);
      })
      .catch((error) => {
        setTokenizing(false);
        console.error("Error tokenizing batch", error);
        setStatusMonitor((prev) => {
          return {
            status: "error",
            tokenType: "bottle",
            message: "Error tokenizing batch",
            txHash: prev.txHash,
            refId: prev.refId,
          };
        });
        cb(error);
      });
  };

  useEffect(() => {
    const { txHash, status } = statusMonitor;
    if (
      status === "tokenizing" ||
      status === "burning" ||
      status === "updating"
    ) {
      const timer = setInterval(() => {
        console.log("MAESTRO TIMER", txHash);

        fetch("/api/maestro/get-tx-details", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ txHash }),
        })
          .then(async (res: any) => {
            const data = await res.json();
            // console.log("MAESTRO RES", data);
            clearInterval(timer);
            setTokenizing(false);
            setStatusMonitor((prev) => {
              return {
                status: "success",
                tokenType: prev.tokenType,
                message: "Transaction completed",
                txHash: prev.txHash,
                refId: prev.refId,
              };
            });
            setAction("done");
          })
          .catch((error: any) => {
            // console.error("MAESTRO ERROR", error, txHash);
          });
      }, 5000);

      const timeout = setTimeout(() => {
        clearInterval(timer);
        setTokenizing(false);
        setStatusMonitor({
          status: "error",
          tokenType: null,
          message: "Transaction timed out",
          txHash,
          refId: null,
        });
      }, 900000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [statusMonitor]);

  const value = {
    tokenizing,
    updateTokenizing,
    tokenizeBatch,
    batch,
    batchDetails,
    getBatch,
    updateBatchToken,
    burnBatchToken,
    tokenizeBottle,
    action,
    previousAction,
    updateAction,
    statusMonitor,
    statusTimer,
    wineId,
  };

  return (
    <TokenizerContext.Provider value={value}>
      {children}
    </TokenizerContext.Provider>
  );
};
