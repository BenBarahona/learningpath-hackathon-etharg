// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc,
  } from "firebase/firestore";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf6ZVDr4GUGooygsvAotk5bIW-NiM0QU4",
  authDomain: "hackathon-argentina.firebaseapp.com",
  projectId: "hackathon-argentina",
  storageBucket: "hackathon-argentina.appspot.com",
  messagingSenderId: "216056556484",
  appId: "1:216056556484:web:b07d3f60367365532e9291",
  measurementId: "G-MF5Q6TBL1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export {
    db,
    collection,
    addDoc,
    setDoc,
    getDocs,
    getAuth,
    doc,
    signInWithEmailAndPassword,
  };