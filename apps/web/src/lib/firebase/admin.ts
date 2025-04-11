import "server-only";

import admin from "firebase-admin";
import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
} from "@/utils/envConstants";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  // console.log("\n\n===============================");
  // console.log(params.privateKey);
  // console.log(privateKey);
  // console.log("===============================\n\n");

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey: privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    privateKey: FIREBASE_PRIVATE_KEY
      ? Buffer.from(FIREBASE_PRIVATE_KEY).toString()
      : "",
  };

  return createFirebaseAdminApp(params);
}

await initAdmin();

console.log("\n\n===============================");
console.log("FIREBASE ADMIN INIT");
console.log("===============================\n\n");

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();
