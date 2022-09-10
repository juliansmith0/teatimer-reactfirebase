import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCufPAjvyoJh_a4ivFXFx6U8VD7f856WPc",
  authDomain: "teatimer-f5477.firebaseapp.com",
  projectId: "teatimer-f5477",
  storageBucket: "teatimer-f5477.appspot.com",
  messagingSenderId: "746508373552",
  appId: "1:746508373552:web:5fa16c66a7eee31a4967f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
