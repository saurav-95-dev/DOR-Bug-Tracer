import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
    apiKey: "AIzaSyCpCcCa54MDfyVFXApWEkc_Er7GKxUYeRA",
    authDomain: "oncall-bugtracer-dev-support.firebaseapp.com",
    projectId: "oncall-bugtracer-dev-support",
    storageBucket: "oncall-bugtracer-dev-support.firebasestorage.app",
    messagingSenderId: "685798863751",
    appId: "1:685798863751:web:ffaaba92685d9b1ccdd922",
    measurementId: "G-VQJTNDYP3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
