import { CheckIdTokenResp } from "@/types/authTypes";
import { initAdmin } from "~/src/lib/firebase/admin";

export const checkIdToken = async (idToken: string, requestUrls: string) => {
  try {
    if (!idToken || !requestUrls) return;
    const resp = await fetch(
      new URL("/api/auth/verify-id-token", requestUrls),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    if (resp.status !== 200) return;
    return (await resp.json()) as CheckIdTokenResp;
  } catch (error) {
    console.error(error);
  }
};
