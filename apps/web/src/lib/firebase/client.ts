// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import {
  NEXT_PUBLIC_FB_API_KEY,
  NEXT_PUBLIC_FB_APP_ID,
  NEXT_PUBLIC_FB_AUTH_DOMAIN,
  NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FB_PROJECT_ID,
  NEXT_PUBLIC_FB_STORAGE_BUCKET,
} from "@/utils/envConstants";

const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FB_API_KEY,
  authDomain: NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { app, auth, db, storage, functions };
