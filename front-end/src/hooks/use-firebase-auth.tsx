import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { User, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc, collection, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<UserInterface | null>(null);
  const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);

  const reloadAuthUserData = () => {
    if (auth.currentUser) {
      auth.currentUser.reload().then(() => {
        authStateChanged(auth.currentUser);
      });
    }
  }

  const formatAuthUser = (user: UserInterface) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
  });

  // const listenUserProjects = async (userId: string) => {
  //   const projectsRef = collection(db, "users", userId, "projects");
  //   const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
  //     const userProjects: UserProjects = {};
  //     snapshot.forEach((doc) => {
  //       userProjects[doc.id] = doc.data() as {
  //         projectName: string;
  //         stackProject: string;
  //         urlProject: string;
  //         githubProject: string;
  //         projectDescription: string;
  //       };
  //     });
  //     setAuthUser((prevAuthUser) => ({
  //       ...prevAuthUser!,
  //       userProjects: userProjects,
  //     }));
  //     setAuthUserIsLoading(false);
  //   });
  //   return unsubscribe;
  // };

  const getUserDocument = async (user: UserInterface) => {
    if (auth.currentUser) {
      const documentRef = doc(db, "users", auth.currentUser.uid);
      onSnapshot(documentRef, async (doc) => {
        if (doc.exists()) {
          const compactUser = user;
          compactUser.userDocument = doc.data() as UserDocument;
          setAuthUser((prevAuthUser) => ({
            ...prevAuthUser!,
            ...compactUser,
          }));
          setAuthUserIsLoading(false);
        }
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
    // await listenUserProjects(formattedUser.uid!);
    setAuthUser(formattedUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    authUserIsLoading,
    reloadAuthUserData,
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
