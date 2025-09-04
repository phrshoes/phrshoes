import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJz5fzaEn1bPX2-T75kkmRrht7ZLU6vFk",
    authDomain: "phrshoes-c8223.firebaseapp.com",
    projectId: "phrshoes-c8223",
    storageBucket: "phrshoes-c8223.firebasestorage.app",
    messagingSenderId: "890903359751",
    appId: "1:890903359751:web:82ad1fc0fddac45eccd5a2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);