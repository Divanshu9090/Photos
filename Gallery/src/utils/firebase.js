import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY,
    authDomain: "pixelvault-a6895.firebaseapp.com",
    projectId: "pixelvault-a6895",
    storageBucket: "pixelvault-a6895.firebasestorage.app",
    messagingSenderId: "148952392781",
    appId: "1:148952392781:web:397a1bf258c0c949dc6804",
    measurementId: "G-J9QFERT3TD"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app);

export default app;