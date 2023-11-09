// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-BtAxOHDCrc3p0HA6wwoIHqRPYTOruno",
  authDomain: "expense-tracker-e7508.firebaseapp.com",
  projectId: "expense-tracker-e7508",
  storageBucket: "expense-tracker-e7508.appspot.com",
  messagingSenderId: "670667443559",
  appId: "1:670667443559:web:bc0dc1ef77cc89040df3c2",
  measurementId: "G-E2MJ4NET75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// firebase login
// firebase init
// firebase deploy