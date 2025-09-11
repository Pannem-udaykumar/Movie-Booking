import { db } from "../auth/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const BOOKINGS_COLLECTION = "bookings";

// ✅ Create a booking
export const createBooking = async (booking) => {
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...booking,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// ✅ Get all bookings
export const getBookings = async () => {
  const snapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

