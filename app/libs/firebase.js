import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cre8ive-4mula-11d31.firebaseapp.com",
  projectId: "cre8ive-4mula-11d31",
  storageBucket: "cre8ive-4mula-11d31.appspot.com",
  messagingSenderId: "525927454599",
  appId: "1:525927454599:web:3526f027975b7cda6ae522",
  measurementId: "G-FGSX08MHCE",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const firestore = getFirestore(app);
// export const storage = getStorage(app);
// export const analytics = getAnalytics(app);
