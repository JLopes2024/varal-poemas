import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcPiZUxzHC_M41dGeYKHsUQ5QeJkzpFz0",
  authDomain: "mosaico-web-b03a8.firebaseapp.com",
  projectId: "mosaico-web-b03a8",
  storageBucket: "mosaico-web-b03a8.firebasestorage.app",
  messagingSenderId: "21824695574",
  appId: "1:21824695574:web:332cbb9df40e3e9f3e3437"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);