import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Project } from '@/types/user';
import { db } from '@/config/firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const addUserProject = async (userId: string, project: Project, imageFiles: File[]) => {
  if (!imageFiles || imageFiles.length === 0) {
    console.error("No image files selected");
    return null;
  }

  try {
    const storage = getStorage();
    const imageURLs: string[] = [];

    // Boucle sur chaque fichier d'image dans le tableau
    for (const imageFile of imageFiles) { // Utilisation de 'for...of' pour la clarté
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


export const updateUserProject = async (
  userId: string,
  projectId: string,
  newProjectData: Partial<Project>,
  newImageFiles: File[],
  imagePreviews: string[] // Ici, imagePreviews est un tableau de chaînes d'URL
) => {
  const projectRef = doc(db, "users", userId, "projects", projectId);
  const storage = getStorage();

  try {
    const oldProjectSnap = await getDoc(projectRef);
    if (!oldProjectSnap.exists()) {
      console.error("Le projet n'existe pas");
      return null;
    }
    const oldProjectData = oldProjectSnap.data() as ProjectWithId;

    // Identifier les URLs des images non modifiées
    const unchangedImageURLs = oldProjectData.photoURLs.filter(url => imagePreviews.includes(url));

    // Télécharger les nouvelles images et récupérer leurs URLs
    const newImageURLs: string[] = [];
    for (const file of newImageFiles) {
      if (!imagePreviews.includes(file.name)) { // Vérifier si le fichier n'est pas dans les aperçus
        const imageRef = ref(storage, `users-media/${userId}/projects/${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        newImageURLs.push(downloadURL);
      }
    }

    // Mettre à jour Firestore avec les images non modifiées et les nouvelles images
    await updateDoc(projectRef, {
      ...newProjectData,
      photoURLs: [...unchangedImageURLs, ...newImageURLs],
    });

    console.log("Projet mis à jour avec succès");
    return [...unchangedImageURLs, ...newImageURLs]; // Retourner la liste complète des URLs
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet dans Firestore :", error);
    return null;
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
interface ProjectWithId extends Project {
  id: string;
  photoURLs: string[];
}