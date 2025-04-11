import { DecodedIdToken } from "firebase-admin/auth";

export type LoginStorage = {
  email: string;
};

export type ForgotPassStorage = {
  email: string;
};

export type ConfirmEmailParamsType = {
  mode: string;
  continueUrl: string;
  lang: string;
  oobCode: string;
};

export type CheckIdTokenResp = {
  decodedData: DecodedIdToken;
  token: string;
};
