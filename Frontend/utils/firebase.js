// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginzarvoc.firebaseapp.com",
  projectId: "loginzarvoc",
  storageBucket: "loginzarvoc.appspot.com",
  messagingSenderId: "572018392242",
  appId: "1:572018392242:web:d67c9cdf3ecd2c01af1dab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
