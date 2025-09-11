


import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config stays the same
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Set up Google Auth Provider
export const provider = new GoogleAuthProvider();

// ✅ Force Google to always show account selector popup
provider.setCustomParameters({
  prompt: "select_account",
});

// ✅ Login with Google
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);  // <-- This uses the provider above
  return result.user;
};

// ✅ Logout
export const logout = () => signOut(auth);
