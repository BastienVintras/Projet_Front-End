import { auth } from "@/config/firebase-config";
import { UserInterface } from "@/types/user";
import { User, onAuthStateChanged } from "firebase/auth";
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
        //get document firestore
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
