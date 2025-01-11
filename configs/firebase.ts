// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA_V0_AFfPttD0DM9cr4c9t7xGi_5c2USU",
  authDomain: "medify-mobile-app.firebaseapp.com",
  projectId: "medify-mobile-app",
  storageBucket: "medify-mobile-app.firebasestorage.app",
  messagingSenderId: "341027324463",
  appId: "1:341027324463:web:e9a3d655086a68f9643cda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
