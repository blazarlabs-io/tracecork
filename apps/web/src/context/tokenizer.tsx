"use client";

// LIBS
import { createContext, useContext, useState } from "react";
import { TokenAction } from "../types/db";

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

  const tokenizeBatch = (data: any, cb: (cbData: any) => void) => {
    setTokenizing(true);
    setAction("create");

    console.log("\n\nXXXXXXXXXXXXXXXXXX");
    console.log("TOKENIZE BATCH DATA", data);
    console.log("XXXXXXXXXXXXXXXXXX\n\n");

    fetch(
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/true/mint-batch`,
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
        setTokenizing(false);
        // console.log("TOKENIZE BATCH RESULT", data);
        cb(resData);
      })
      .catch((error) => {
        setTokenizing(false);
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
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}/tx/true/update-batch/${tokenId}`,
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
        setTokenizing(false);
        // console.log("TOKENIZE BATCH RESULT", data);
        cb(data);
      })
      .catch((error) => {
        setTokenizing(false);
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
        setTokenizing(false);
        console.log("deleted BATCH RESULT", data);
        cb(data);
      })
      .catch((error) => {
        setTokenizing(false);
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
  };

  return (
    <TokenizerContext.Provider value={value}>
      {children}
    </TokenizerContext.Provider>
  );
};
