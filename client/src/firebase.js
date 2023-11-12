// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-e9afa.firebaseapp.com",
  projectId: "mern-real-estate-e9afa",
  storageBucket: "mern-real-estate-e9afa.appspot.com",
  messagingSenderId: "1053032512506",
  appId: "1:1053032512506:web:ae651df748b30732560243",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
