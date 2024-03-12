import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useAuth } from "@/context/authUserContext";
import { Button } from "@/ui/design-system/button/button";

const AddNewProject = () => {
  const { authUser } = useAuth();

  const addProject = async () => {
    const userID = authUser.uid;
    const projectsCollectionRef = collection(doc(db, 'users', userID), 'projets');

    try {
      const projectData = {
        name: 'Nouveau Projet',
        description: 'Description du nouveau projet',
        // Autres champs de données du projet
      };

      const docRef = await addDoc(projectsCollectionRef, projectData);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Button action={addProject}>Ajouter Nouveau Projet</Button>
  );
};

export default AddNewProject;
