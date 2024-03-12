import { addDoc, collection, doc,getDocs,setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase-config";
import { FirebaseError } from "firebase/app";
import { Project } from "@/types/user";


export const firestoreCreateDocument = async (
  collectionName: string,
  documentID: string,
  data: object
) => {
  try {
    const documentRef = doc(db, collectionName, documentID);
    await setDoc(documentRef, data);
    return { data: true };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    //...@ todo format error
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message,
      },
    };
  }
};


export const firestoreUpdateDocument = async (
  collectionName: string,
  documentID: string,
  data: object
) => {
  try {
    const documentRef = doc(db, collectionName, documentID);
    await updateDoc(documentRef, data);
    return { data: true };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    //...@ todo format error
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message,
      },
    };
  }
};
