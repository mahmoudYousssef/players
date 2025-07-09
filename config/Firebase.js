// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBwUm_EY7MvEg4sw_VHvY5ZqzzHQMQrKoE",
  authDomain: "player-11bcd.firebaseapp.com",
  projectId: "player-11bcd",
  storageBucket: "player-11bcd.firebasestorage.app",
  messagingSenderId: "690769796744",
  appId: "1:690769796744:web:77b51970267ed22850c93d",
  measurementId: "G-Z55QYRDPX5"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);