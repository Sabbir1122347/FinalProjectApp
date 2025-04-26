// Import the Firebase modules you want to use
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDty2NQZjP_vl2_ZPjS2t1sX4h9s4d-gws",
  authDomain: "anonymous-crime-reportin-a6f4c.firebaseapp.com",
  projectId: "anonymous-crime-reportin-a6f4c",
  storageBucket: "anonymous-crime-reportin-a6f4c.appspot.com", // ⚠️ Corrected .app to .app**spot.com**
  messagingSenderId: "228923523586",
  appId: "1:228923523586:web:55aa51f9bf77cc3bdc1d1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);       // Firestore database
export const storage = getStorage(app);    // File uploads
export const auth = getAuth(app);          // Admin authentication
