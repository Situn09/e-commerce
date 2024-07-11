import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, persistentLocalCache } from "firebase/firestore";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtSLC3bpMfdGQv4iBPzFBDs46GaoL7uT4",
  authDomain: "e-commerce-2ed1a.firebaseapp.com",
  projectId: "e-commerce-2ed1a",
  storageBucket: "e-commerce-2ed1a.appspot.com",
  messagingSenderId: "374500776232",
  appId: "1:374500776232:web:52092e50a8346fe149d81d",
  measurementId: "G-WPT2BYB39N",
  persistence: browserLocalPersistence,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage();
export { app, db, auth, storage };
