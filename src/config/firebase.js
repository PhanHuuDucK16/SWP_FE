// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi8mc_h1cqGryLdxKRWCc5PjrXz5LuVcA",
  authDomain: "koimanagementsystem.firebaseapp.com",
  projectId: "koimanagementsystem",
  storageBucket: "koimanagementsystem.appspot.com",
  messagingSenderId: "574672977531",
  appId: "1:574672977531:web:6ea35809288fd428ecacde",
  measurementId: "G-E1LGTRJ24W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, storage, googleProvider };