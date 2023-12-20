import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


//configuration firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkZEPX-HNwyIXHrOJzVXBivddCLFOzfzI",
  authDomain: "app-bast.firebaseapp.com",
  projectId: "app-bast",
  storageBucket: "app-bast.appspot.com",
  messagingSenderId: "377873792014",
  appId: "1:377873792014:web:e1acf8478c6235287d905f"
};

//initialisation firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);