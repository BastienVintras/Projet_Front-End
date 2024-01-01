import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { User, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<UserInterface | null>(null); //null si l'utilisateur n 'est pas connecté
  const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true); //est qu on est en train de charger?

  const formatAuthUser = (user: UserInterface) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
  });

  const getUserDocument = async (user: UserInterface) => {
    if (auth.currentUser) {
      const documentRef = doc(db, "users", auth.currentUser.uid); //"users est le nom de la collection"
      const compactUser = user;
      console.log(documentRef);
      onSnapshot(documentRef, async (doc) => {
        if (doc.exists()) {
          compactUser.userDocument = doc.data() as UserDocument;
        }
        setAuthUser((prevAuthUser) => ({
          ...prevAuthUser, //etat precedent
          ...compactUser, // nouvel etat mis a jour, changement de state
        }));
        setAuthUserIsLoading(false);
        console.log(onSnapshot);
      });
    }
  };

  const authStateChanged = async (authState: UserInterface | User | null) => {
    if (!authState) {
      setAuthUser(null);
      setAuthUserIsLoading(false);
      return;
    }
    setAuthUserIsLoading(true);
    const formattedUser = formatAuthUser(authState);
    await getUserDocument(formattedUser);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    authUserIsLoading,
  };
}

//Ce hook utilise les fonctions useState et
//useEffect de React pour gérer l'état de l'utilisateur authentifié et le chargement de l'authentification.
//Il utilise également des fonctions Firebase,
//telles que onAuthStateChanged pour détecter les changements d'état d'authentification,
//et onSnapshot pour écouter les modifications de documents Firestore.
//Le hook renvoie un objet contenant authUser (l'utilisateur authentifié) et authUserIsLoading (l'état de chargement).

//En résumé, ce code permet de suivre l'état d'authentification de l'utilisateur,
//de récupérer des détails supplémentaires de l'utilisateur à partir de Firestore et
//de fournir ces informations sous forme de retour d'un hook personnalisé.
