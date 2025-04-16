"use client";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import maestroClient from "../lib/maestro/client";
import { StatusMonitor, StatusTimer, TokenAction } from "../types/db";
import { db } from "../lib/firebase/services/db";
import { clear } from "console";

export interface TokenizerContextInterface {
  tokenizing: boolean;
  updateTokenizing: (tokenizing: boolean) => void;
  tokenizeBatch: (data: any, cb: (data: any) => void) => void;
  batch: any;
  updateBatch: (batch: any) => void;
  batchDetails: any;
  getBatch: (batchId: string) => void;
  updateBatchToken: (
    tokenId: string,
    batch: any,
    cb: (data: any) => void,
  ) => void;
  burnBatchToken: (tokenId: string, cb: (data: any) => void) => void;
  tokenizeBottle: (data: any, cb: (data: any) => void) => void;
  action: TokenAction;
  statusMonitor: StatusMonitor;
  statusTimer: StatusTimer;
  startStatusMonitor: (
    txhash: string,
    uid: string,
    wineId: string,
    onComplete: (data: any) => void,
    onError: (error: any) => void,
  ) => void;
  stopStatusMonitor: () => void;
}

const contextInitialData: TokenizerContextInterface = {
  tokenizing: false,
  updateTokenizing: () => {},
  tokenizeBatch: () => {},
  batch: null,
  updateBatch: () => {},
  batchDetails: null,
  getBatch: () => {},
  updateBatchToken: () => {},
  burnBatchToken: () => {},
  tokenizeBottle: () => {},
  action: null,
  statusMonitor: {
    status: "idle",
    message: "Not started",
  },
  statusTimer: null,
  startStatusMonitor: () => {},
  stopStatusMonitor: () => {},
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
  const [statusMonitor, setStatusMonitor] = useState<
    TokenizerContextInterface["statusMonitor"]
  >(contextInitialData.statusMonitor);
  const [statusTimer, setStatusTimer] = useState<
    TokenizerContextInterface["statusTimer"]
  >(contextInitialData.statusTimer);

  const updateTokenizing = (state: boolean) => {
    setTokenizing(state);
  };

  const updateBatch = (batch: any) => {
    setBatch(batch);
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
        console.log("GET BATCH RESULTS:", data);
        setBatchDetails(data);
      })
      .catch((error) => {
        console.log(error);
        setBatchDetails(null);
      });
  };

  const getMaestro = (
    txhash: string,
    uid: string,
    wineId: string,
    onComplete: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    fetch("/api/maestro/get-tx-details", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txhash, uid, wineId }),
    })
      .then(async (res: any) => {
        const data = await res.json();
        console.log("MAESTRO RES", data);
        onComplete && onComplete(data);
      })
      .catch((error: any) => {
        console.log("MAESTRO ERROR", error, txhash, uid, wineId);
        onError && onError(error);
      });
  };

  const startStatusMonitor = (
    txhash: string,
    uid: string,
    wineId: string,
    onComplete: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    if (statusTimer) {
      clearInterval(statusTimer);
    }

    setStatusMonitor({
      status: "tokenizing",
      message: "Monitoring transaction status",
    });

    const timer = setInterval(() => {
      // * We fetch and query the blockchain for the status of the transaction
      console.log("Fetching Maestro", txhash, uid, wineId);
      getMaestro(
        txhash,
        uid,
        wineId,
        (data: any) => {
          setStatusMonitor({
            status: "success",
            message: "Transaction completed",
          });
          onComplete && onComplete(data);
          stopStatusMonitor();
          clearInterval(timer);
          setStatusTimer(null);
          setTokenizing(false);
        },
        (error: any) => {
          setStatusMonitor({
            status: "error",
            message: "Transaction failed",
          });
          onError && onError(error);
        },
      );
    }, 5000);

    setStatusTimer(timer);

    // * Set timeout to stop the monitor
    setTimeout(() => {
      clearInterval(timer);
      setStatusTimer(null);
      setStatusMonitor({
        status: "error",
        message: "Transaction timed out",
      });
      stopStatusMonitor();
    }, 900000);
  };

  const stopStatusMonitor = () => {
    if (statusTimer) {
      clearInterval(statusTimer);
    }
    setStatusMonitor({ status: "idle", message: "Not started" });
  };

  const tokenizeBatch = (data: any, cb: (cbData: any) => void) => {
    setTokenizing(true);
    setAction("create");

    console.log("\n\nXXXXXXXXXXXXXXXXXX");
    console.log("TOKENIZE BATCH DATA", data);
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
        // setTokenizing(false);
        console.log("TOKENIZE BATCH RESULT / resData:", resData);
        cb(resData);
      })
      .catch((error) => {
        // setTokenizing(false);
        console.log(error);
        cb(error);
      });
  };

  const updateBatchToken = (
    tokenId: string,
    batch: any,
    cb: (data: any) => void,
  ) => {
    setAction("update");
    setTokenizing(true);
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
        // setTokenizing(false);
        // console.log("TOKENIZE BATCH RESULT", data);
        cb(data);
      })
      .catch((error) => {
        // setTokenizing(false);
        console.log(error);
        cb(error);
      });
  };

  const burnBatchToken = (tokenId: string, cb: (data: any) => void) => {
    console.log(tokenId);
    setAction("burn");
    setTokenizing(true);
    fetch(
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/true/burn-ref/${tokenId}`,
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
        console.log("deleted BATCH RESULT", data);
        cb(data);
      })
      .catch((error) => {
        // setTokenizing(false);
        console.log(error);
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
        console.log(error);
        cb(error);
      });
  };

  const value = {
    tokenizing,
    updateTokenizing,
    tokenizeBatch,
    batch,
    updateBatch,
    batchDetails,
    getBatch,
    updateBatchToken,
    burnBatchToken,
    tokenizeBottle,
    action,
    statusMonitor,
    startStatusMonitor,
    stopStatusMonitor,
    statusTimer,
  };

  return (
    <TokenizerContext.Provider value={value}>
      {children}
    </TokenizerContext.Provider>
  );
};
