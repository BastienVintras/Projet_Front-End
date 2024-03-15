import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Project } from '@/types/user';
import { db } from '@/config/firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addUserProject = async (userId: string, project: Project, imageFiles: FileList | null) => {
  if (!imageFiles || imageFiles.length === 0) {
    console.error("No image files selected");
    return null;
  }

  try {
    const storage = getStorage();
    const imageURLs: string[] = [];

    // Boucle sur chaque fichier d'image dans la liste
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];
      
      // Créer une référence à l'emplacement dans Firebase Storage où vous voulez stocker l'image
      const imageRef = ref(storage, `users-media/${userId}/projects/${Date.now()}_${imageFile.name}`);
      
      // Télécharger l'image vers Firebase Storage
      await uploadBytes(imageRef, imageFile);
      
      // Obtenir l'URL de téléchargement de l'image
      const imageURL = await getDownloadURL(imageRef);
      imageURLs.push(imageURL); // Ajoutez l'URL de l'image à la liste des URL d'images
    }

    // Créer une référence au document de l'utilisateur dans la collection "users"
    const userDocRef = doc(db, 'users', userId);
    // Créer une sous-collection "projects" pour cet utilisateur
    const projectsCollectionRef = collection(userDocRef, 'projects');
    // Ajouter le projet à la sous-collection "projects" avec les URL des images
    const projectData = {
      ...project,
      photoURLs: imageURLs // Assurez-vous que votre modèle de projet comporte un champ "photoURLs"
    };
    const projectDocRef = await addDoc(projectsCollectionRef, projectData);
    
    return projectDocRef.id;
  } catch (error) {
    console.error('Error adding project: ', error);
    return null;
  }
};


export const updateUserProject = async (userId: string, projectId: string, projectData: Partial<Project>) => {
  const projectRef = doc(db, 'users', userId, 'projects', projectId);
  
  try {
    await updateDoc(projectRef, projectData);
  } catch (error) {
    console.error('Error updating project: ', error);
  }
};

export const deleteUserProject = async (userId: string, projectId: string) => {
  
  const projectRef = doc(db, 'users', userId, 'projects', projectId);
  try {
    await deleteDoc(projectRef);
    console.log("Project deleted successfully");
  } catch (error) {
    console.error('Error deleting project: ', error);
  }
};
