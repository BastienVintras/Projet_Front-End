import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { User, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<UserInterface | null>(null); //null si l'utilisateur n 'est pas connecté
  const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true); //est qu on est en train de charger?

  const formatAuthUser = (user: UserInterface) =>({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
  })

const getUserDocument = async(user: UserInterface) =>{
    if (auth.currentUser){
        const documentRef = doc(db,"user",auth.currentUser.uid)
        const compactUser = user;

        onSnapshot(documentRef, async (doc) => {
            if(doc.exists()){
                compactUser.userDocument=doc.data() as UserDocument
            }
            setAuthUser(compactUser)//utilisateur mis a jour
        })
    }
}

const authStateChanged = async(authState: UserInterface | User |null) => {
    if(!authState){
        setAuthUser(null);
        setAuthUserIsLoading(false);
        return;
    }
    setAuthUserIsLoading(true);
    const formatedUser = formatAuthUser(authState);
    await getUserDocument(formatedUser)

    

}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("user", user);
      } else {
        console.log("tu n'es pas connecté");
      }
    });
    return () => unsubscribe()
  }, []);

  return {
    authUser,
    authUserIsLoading,
  };
}
