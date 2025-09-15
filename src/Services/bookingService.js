import { db } from "../auth/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const BOOKINGS_COLLECTION = "bookings";


export const createBooking = async (booking) => {
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...booking,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};


export const getBookings = async () => {
  const snapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

