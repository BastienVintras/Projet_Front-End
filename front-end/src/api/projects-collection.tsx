import { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { useAuth } from '@/context/authUserContext';

export const ProjectsCollection = () => {
  const { authUser } = useAuth();

  useEffect(() => {
    const createProjectsCollection = async () => {
      try {
        // Vérifier si l'utilisateur est authentifié et si son UID est défini
        if (authUser && authUser.uid) {
          // Créer une référence à la collection "projets"
          const projectsCollectionRef = collection(db, 'projets');

          // Ajouter un document vide pour créer la collection "projets"
          await addDoc(projectsCollectionRef, {});

          console.log('La sous-collection "projets" a été créée avec succès.');
        } else {
          console.warn('L\'utilisateur n\'est pas correctement authentifié.');
        }
      } catch (error) {
        console.error('Erreur lors de la création de la sous-collection "projets":', error);
      }
    };

    createProjectsCollection();
  }, [authUser]); // Assurez-vous que cela s'exécute une seule fois au montage du composant

  // Retourne null si vous ne voulez pas rendre ce composant
  return null;
};
