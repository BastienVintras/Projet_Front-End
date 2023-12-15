//Permet de centraliser dans ce fichier les appels api à firebase et ainsi pouvoir 
//changer facilement d'api si besoin

import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/config/firebase-config"
import {FirebaseError} from "firebase/app";

export const firebaseCreateUser = async (email:string,password:string) => {
   try {
        const userCredential = await createUserWithEmailAndPassword(auth, email ,password)
        return {data : userCredential.user}
    } catch(error) {
        const firebaseError = error as FirebaseError
        return {error:{
            code: firebaseError.code,
            message: firebaseError.message
        }}

    }

}