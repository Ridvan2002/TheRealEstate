import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPnqdc5FptHd16E9yG-5wdIzBS6bZ_oTI",
  authDomain: "myrealestate-d4e9e.firebaseapp.com",
  projectId: "myrealestate-d4e9e",
  storageBucket: "myrealestate-d4e9e.firebasestorage.app",
  messagingSenderId: "421876792625",
  appId: "1:421876792625:web:9dc6529a6b4ef2bcf50410",
  measurementId: "G-55P8DZHBWY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db };
