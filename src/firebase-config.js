// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEPTr9X5fYI1kejHmMOtzCQ6Lm8tS9dqY",
  authDomain: "tal-blog.firebaseapp.com",
  projectId: "tal-blog",
  storageBucket: "tal-blog.appspot.com",
  messagingSenderId: "558895582449",
  appId: "1:558895582449:web:bf426ef7df79c5434d2d50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();