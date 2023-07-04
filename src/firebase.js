// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvLLC8AGQ6Aq2bXLA7qlHKSbC0KOgBlMU",
  authDomain: "todo-app-695f4.firebaseapp.com",
  projectId: "todo-app-695f4",
  storageBucket: "todo-app-695f4.appspot.com",
  messagingSenderId: "532801739812",
  appId: "1:532801739812:web:ce1b11220fab26d30f8cb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)