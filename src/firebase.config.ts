// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCghhmtqG6trmmQC1-nf-RlZMqpvmIVbwo",
  authDomain: "my-stv-9b6ff.firebaseapp.com",
  projectId: "my-stv-9b6ff",
  storageBucket: "my-stv-9b6ff.firebasestorage.app",
  messagingSenderId: "340439981690",
  appId: "1:340439981690:web:8269228eb2446d7ad365c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;