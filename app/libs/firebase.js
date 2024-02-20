import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cre8ive-4mula.firebaseapp.com",
  projectId: "cre8ive-4mula",
  storageBucket: "cre8ive-4mula.appspot.com",
  messagingSenderId: "461648490793",
  appId: "1:461648490793:web:881641f6e86a8f99568738",
  measurementId: "G-GJHPEFVQHX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);
