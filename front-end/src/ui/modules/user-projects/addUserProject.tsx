import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Project } from '@/types/user';
import { UserInterface } from '@/types/user';
import { db, storage } from '@/config/firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addUserProject = async (userId: string, project: Project, imageFile: File) => {
  try {
    const storage = getStorage();
    
    // Créer une référence à l'emplacement dans Firebase Storage où vous voulez stocker l'image
    const imageRef = ref(storage, `users-media/${userId}/project_images/${Date.now()}_${imageFile.name}`);

    // Télécharger l'image vers Firebase Storage
    await uploadBytes(imageRef, imageFile);

    // Obtenir l'URL de téléchargement de l'image
    const imageURL = await getDownloadURL(imageRef);

    // Créer une référence au document de l'utilisateur dans la collection "users"
    const userDocRef = doc(db, 'users', userId);
    // Créer une sous-collection "projects" pour cet utilisateur
    const projectsCollectionRef = collection(userDocRef, 'projects');
    // Ajouter le projet à la sous-collection "projects" avec l'URL de l'image
    const projectData = {
      ...project,
      photoURL: imageURL // Assurez-vous que votre modèle de projet comporte un champ "photoURL"
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
  } catch (error) {
    console.error('Error deleting project: ', error);
  }
};
