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
import tk from "../services/logger";

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
  tokenizeBottle: (data: any, cb: (data: any) => void) => void;
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

  const updateTokenizing = (state: boolean) => {
    setTokenizing(state);
  };

  // * ///////////////// BATCH ///////////////////

  const getBatch = (batchId: string) => {
    // setAction("get");
    tk.log(
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
        tk.log("GET BATCH RESULTS:", data);
        setBatchDetails(data);
      })
      .catch((error) => {
        tk.error("Error getting batch", error);
        setBatchDetails(null);
      });
  };

  const updateAction = (action: TokenAction) => {
    setAction(action);
    setPreviousAction(action);
  };

  const tokenizeBatch = useCallback(
    (data: any, cb: (cbData: any) => void) => {
      const mdata = JSON.parse(data.batch_data.info).id;
      setWineId(() => mdata);
      setTokenizing(true);
      setAction("create");
      setPreviousAction("create");

      tk.log("\n\nXXXXXXXXXXXXXXXXXX");
      tk.log("WINE ID", mdata);
      tk.log("TOKENIZE BATCH DATA", data);
      tk.log("XXXXXXXXXXXXXXXXXX\n\n");

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
          setStatusMonitor(() => {
            return {
              status: "tokenizing",
              message:
                "Tokenizing batch data. We will notify you when it's done.",
              txHash: resData.txId,
              refId: resData.tokenRefId,
            };
          });
          setBatch(resData);
          tk.log("TOKENIZE BATCH RESULT / resData:", resData);
          cb(resData);
        })
        .catch((error) => {
          tk.error("Error tokenizing batch", error);
          setStatusMonitor((prev) => {
            return {
              status: "error",
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

    const mdata = JSON.parse(batch.batch_data.info).id;
    setWineId(() => mdata);

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
            message:
              "Your batch data is being updated. We will notify you when it is complete.",
            txHash: data.txId,
            refId: tokenId, //data.tokenRefId,
          };
        });
        setBatch(data);
        cb(data);
      })
      .catch((error) => {
        tk.log("Error updating batch", error);
        setStatusMonitor((prev) => {
          return {
            status: "error",
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
    tk.log(tokenId);
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
        tk.log("deleted BATCH RESULT", data);
        setStatusMonitor((prev) => {
          return {
            status: "burning",
            message:
              "Your batch data is being burned. We will notify you when it is complete.",
            txHash: prev.txHash,
            refId: prev.refId,
          };
        });
        setBatch(data);
        cb(data);
      })
      .catch((error) => {
        // setTokenizing(false);
        tk.error("Error burning batch", error);
        setStatusMonitor((prev) => {
          return {
            status: "error",
            message: "Error burning batch",
            txHash: prev.txHash,
            refId: prev.refId,
          };
        });
        cb(error);
      });
  };

  // * ///////////////// BOTTLES ///////////////////

  const tokenizeBottle = (data: any, cb: (data: any) => void) => {
    setTokenizing(true);
    fetch(
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/true/mint-bottle`,
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
        setTokenizing(false);
        cb(data);
      })
      .catch((error) => {
        setTokenizing(false);
        tk.error("Error tokenizing batch", error);
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
            tk.log("MAESTRO RES", data);
            clearInterval(timer);
            setTokenizing(false);
            setStatusMonitor((prev) => {
              return {
                status: "success",
                message: "Transaction completed",
                txHash: prev.txHash,
                refId: prev.refId,
              };
            });
            setAction("done");
          })
          .catch((error: any) => {
            tk.error("MAESTRO ERROR", error, txHash);
          });
      }, 5000);

      const timeout = setTimeout(() => {
        clearInterval(timer);
        setTokenizing(false);
        setStatusMonitor({
          status: "error",
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
