import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";

export const isAdmin = async (email) => {
   const adminEmail = "udaykumar251011@gmail.com";
   return Promise.resolve(email === adminEmail);

  try {
    const docRef = doc(db, "admins", email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().role === "admin";
  } catch (error) {
    console.error("Error checking admin:", error);
    return false;
  }
};


