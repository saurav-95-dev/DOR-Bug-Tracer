
//...........
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpCcCa54MDfyVFXApWEkc_Er7GKxUYeRA",
    authDomain: "oncall-bugtracer-dev-support.firebaseapp.com",
    projectId: "oncall-bugtracer-dev-support",
    storageBucket: "oncall-bugtracer-dev-support.firebasestorage.app",
    messagingSenderId: "685798863751",
    appId: "1:685798863751:web:ffaaba92685d9b1ccdd922",
    measurementId: "G-VQJTNDYP3F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }; // ✅ Ensure 'provider' is exported
