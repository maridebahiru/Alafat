
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtb2VjAxRIfJG1h-b0dwtnpOLisT9PnAY",
  authDomain: "aelafat-zemare-registration.firebaseapp.com",
  databaseURL: "https://aelafat-zemare-registration-default-rtdb.firebaseio.com",
  projectId: "aelafat-zemare-registration",
  storageBucket: "aelafat-zemare-registration.appspot.com",
  messagingSenderId: "1048391615874",
  appId: "1:1048391615874:web:326d861434764262b73b9b",
  measurementId: "G-ZVN6XKDN6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
