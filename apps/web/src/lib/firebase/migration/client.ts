// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgANtyXh-EU56vxJ7H8CUMJ2_j9zdiTsU",
  authDomain: "wine-app-8c2f9.firebaseapp.com",
  databaseURL:
    "https://wine-app-8c2f9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wine-app-8c2f9",
  storageBucket: "wine-app-8c2f9.appspot.com",
  messagingSenderId: "667672459124",
  appId: "1:667672459124:web:49c6df50cdbaf84ac0de21",
  measurementId: "G-ZYPLW88GCW",
};

// Initialize Firebase
const migrationApp = initializeApp(firebaseConfig, "migration");
const migrationDb = getFirestore(migrationApp);
const migrationStorage = getStorage(migrationApp);

export { migrationApp, migrationDb, migrationStorage };
