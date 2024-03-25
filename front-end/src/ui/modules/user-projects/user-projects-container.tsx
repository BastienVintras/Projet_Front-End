import React, { useState, useEffect } from "react";
import { Button } from "@/ui/design-system/button/button";
import { useAuth } from "@/context/authUserContext";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "@/config/firebase-config";
import { Project } from "@/types/user";
import { Typography } from "@/ui/design-system/typography/typography";
import { UploadImages } from "@/ui/components/upload-images/upload-images";
import {
  addUserProject,
  deleteUserProject,
  updateUserProject,
} from "./addUserProject";

interface ProjectWithId extends Project {
  id: string;
  photoURLs: string[];
}

export const ProjectsPage = () => {
  const { authUser } = useAuth();
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [projectName, setProjectName] = useState("");
  const [stackProject, setStackProject] = useState("");
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<ProjectWithId | null>(
    null
  );
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const defaultImage = "/assets/images/icon_plus.png";
  const [imageSrcs, setImageSrcs] = useState(
    imagePreviews.map(() => defaultImage)
  );
  const [erroredImages, setErroredImages] = useState(new Set());

  useEffect(() => {
    const fetchProjects = async () => {
      if (authUser) {
        const q = query(collection(db, "users", authUser.uid, "projects"));
        const querySnapshot = await getDocs(q);
        const projectsData: ProjectWithId[] = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ProjectWithId)
        );
        setProjects(projectsData);
      }
    };

    fetchProjects();
  }, [authUser]);

  const handleImageLoad = (index: number, imageUrl: string) => {
    const newImageSrcs = [...imageSrcs];
    newImageSrcs[index] = imageUrl;
    setImageSrcs(newImageSrcs);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const storage = getStorage();
    const storageRef = ref(
      storage,
      `projects/${authUser.uid}/${Date.now()}_${file.name}`
    );
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    setImagePreviews([...imagePreviews, imageUrl]);
    setImageFiles([...imageFiles, file]);
  };

  const handleDeletePreview = (imageUrl: string) => {
    // Mettre à jour `imagePreviews` pour enlever l'image spécifiée
    const updatedImagePreviews = imagePreviews.filter(
      (url) => url !== imageUrl
    );
    setImagePreviews(updatedImagePreviews);

    // Si vous gérez également les fichiers d'image dans `imageFiles`, mettez à jour cet état également
    // Cela suppose que l'ordre des `imageFiles` correspond à celui des `imagePreviews`
    const imageIndex = imagePreviews.indexOf(imageUrl);
    if (imageIndex !== -1) {
      const updatedImageFiles = imageFiles.filter(
        (_, index) => index !== imageIndex
      );
      setImageFiles(updatedImageFiles);
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    setIsLoading(true);
    if (editingProject) {
      try {
        const imageRef = ref(getStorage(), imageUrl);
        await deleteObject(imageRef);

        const updatedPhotoURLs = editingProject.photoURLs.filter(
          (url) => url !== imageUrl
        );
        await updateDoc(
          doc(db, "users", authUser.uid, "projects", editingProject.id),
          { photoURLs: updatedPhotoURLs }
        );

        setEditingProject({ ...editingProject, photoURLs: updatedPhotoURLs });
        setImagePreviews(updatedPhotoURLs);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
      } finally {
        setIsLoading(false);
        console.log(editingProject.id);
        console.log(editingProject?.id);
        console.log(editingProject!.id);
      }
    }
  };

  const handleImageError = (index: number) => {
    setErroredImages((prevErroredImages) =>
      new Set(prevErroredImages).add(index)
    );
  };

  const openNewProjectModal = () => {
    setIsPopupVisible(true);
    setEditingProject(null);
    setProjectName("");
    setStackProject("");
    setImageFiles([null]);
    setImagePreviews([""]);
  };

  const handleEditButtonClick = (project: ProjectWithId) => {
    setEditingProject(project);
    setProjectName(project.projectName);
    setStackProject(project.stackProject);
    setImagePreviews(project.photoURLs || []);
    setIsPopupVisible(true);
  };

  const handleAddProject = async () => {
    if (!authUser || !imageFiles) return;
    setIsLoading(true);
    try {
      const projectData: Project = { projectName, stackProject, photoURLs: [] };
      const projectId = await addUserProject(
        authUser.uid,
        projectData,
        imageFiles.filter((file) => file !== null) as File[]
      );
      if (projectId) {
        const newProject = {
          ...projectData,
          id: projectId,
          photoURLs: imagePreviews.filter(Boolean),
        };
        setProjects([...projects, newProject]);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!authUser || !editingProject) return;
    setIsLoading(true);

    try {
      // Créer une liste des nouvelles images à télécharger
      const newImagesToUpload = imageFiles.filter(
        (file) => file && !editingProject.photoURLs.includes(file.name)
      ) as File[];

      // Appeler updateUserProject et attendre les nouvelles URLs d'images
      const newImageURLs = await updateUserProject(
        authUser.uid,
        editingProject.id,
        { projectName, stackProject },
        newImagesToUpload,
        editingProject.photoURLs
      );

      // S'assurer que newImageURLs n'est pas null avant de continuer
      if (newImageURLs) {
        // Mettre à jour l'état local avec les nouvelles URLs d'images
        setProjects((prevProjects) =>
          prevProjects.map((project) => {
            if (project.id === editingProject.id) {
              return {
                ...project,
                projectName,
                stackProject,
                photoURLs: newImageURLs,
              };
            }
            return project;
          })
        );
      } else {
        // Gérer le cas où newImageURLs est null (par exemple, afficher une erreur à l'utilisateur)
        console.error("La mise à jour des images a échoué");
      }

      resetForm();
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsPopupVisible(false);
    setProjectName("");
    setStackProject("");
    setImageFiles([null]);
    setImagePreviews([]);
    setImagesToDelete([]);
    setEditingProject(null);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!authUser) return;
    setIsLoading(true);
    try {
      await deleteUserProject(authUser.uid, projectId);
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h1">Projets</Typography>
      <Button action={openNewProjectModal}>Nouveau projet</Button>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Typography variant="h2">
              {editingProject
                ? "Modifier le projet"
                : "Ajouter un nouveau projet"}
            </Typography>
            <input
              className="mt-4 p-2 w-full border rounded"
              type="text"
              placeholder="Nom du projet"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <input
              className="mt-4 p-2 w-full border rounded"
              type="text"
              placeholder="Stack du projet"
              value={stackProject}
              onChange={(e) => setStackProject(e.target.value)}
            />

            {/* Affichage des images existantes avec option de suppression */}
            <div className="images-container">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-container">
                  <img
                    src={preview} // Utilisez directement `preview` pour la source
                    alt={`Aperçu ${index}`}
                    className="w-24 h-24"
                    onError={(e) =>
                      (e.currentTarget.src = "/assets/images/carre_blanc.png")
                    } // Mettez à jour la source en cas d'erreur de chargement
                  />

                  {preview && ( // Vérifiez si `preview` est défini et non vide avant de rendre le bouton "Supprimer"
                    <button
                    className="delete-image-btn"
                    onClick={() => {
                      if (editingProject) {
                        // Si un projet est en cours d'édition, utilisez handleDeleteImage
                        handleDeleteImage(preview);
                      } else {
                        // Si aucun projet n'est en cours d'édition (nouveau projet), utilisez handleDeletePreview
                        handleDeletePreview(preview);
                      }
                    }}
                  >
                    Supprimer
                  </button>
                  )}
                </div>
              ))}
            </div>

            {/* Ajout de nouvelles images */}
            <UploadImages
              handleImageSelect={handleImageSelect}
              uploadProgress={0}
              isLoading={isLoading}
              imagePreview={null}
            />

            <div className="mt-4 flex justify-between">
              <Button
                action={editingProject ? handleUpdateProject : handleAddProject}
                disabled={isLoading}
              >
                {isLoading
                  ? "Chargement..."
                  : editingProject
                  ? "Mettre à jour"
                  : "Ajouter"}
              </Button>
              <Button action={() => setIsPopupVisible(false)}>Annuler</Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        {projects.map((project) => (
          <div key={project.id} className="mb-4 p-4 border rounded-lg">
            <Typography variant="h2" className="font-bold">
              {project.projectName}
            </Typography>
            <Typography className="italic">{project.stackProject}</Typography>
            <div className="flex mt-2">
              {project.photoURLs.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-24 h-24 mr-2 rounded"
                />
              ))}
            </div>
            <Button action={() => handleEditButtonClick(project)}>
              Modifier
            </Button>
            <Button action={() => handleDeleteProject(project.id)}>
              Supprimer
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
