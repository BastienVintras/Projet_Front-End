import React, { useState, useEffect } from "react";
import { Button } from "@/ui/design-system/button/button";
import { useAuth } from "@/context/authUserContext";
import {
  addUserProject,
  updateUserProject,
  deleteUserProject,
} from "./addUserProject"; // Import des fonctions déjà créées
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { Project } from "@/types/user";
import { Typography } from "@/ui/design-system/typography/typography";
import { UploadImages } from "@/ui/components/upload-images/upload-images";

interface ProjectWithId extends Project {
  id: string;
  photoURLs: string[];
}

export const ProjectsPage = () => {
  const { authUser } = useAuth();
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [projectName, setProjectName] = useState("");
  const [stackProject, setStackProject] = useState("");
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectWithId | null>(
    null
  );

  useEffect(() => {
    const fetchProjects = async () => {
      if (authUser) {
        try {
          const q = query(collection(db, "users", authUser.uid, "projects"));
          const querySnapshot = await getDocs(q);
          const projectsData: ProjectWithId[] = [];
          querySnapshot.forEach((doc) => {
            projectsData.push({ id: doc.id, ...doc.data() } as ProjectWithId);
          });
          setProjects(projectsData);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      }
    };

    fetchProjects();
  }, [authUser]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          // Si le résultat est une chaîne, l'ajouter au tableau selectedImageUrl
          setSelectedImageUrl((prevUrls) => [...prevUrls, result]);        } else {
          // Sinon, il s'agit probablement d'un ArrayBuffer, ne rien faire pour le moment
        }
        setImagePreview(result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddProject = async () => {
    if (!authUser || !imageFile) {
      console.error("User not authenticated or image file not selected");
      return;
    }
    setIsLoading(true);
    try {
      const projectData: Project = {
        projectName,
        stackProject,
        photoURLs: []
      };
      const projectId = await addUserProject(
        authUser.uid,
        projectData,
        imageFile
      );
      if (projectId) {
        console.log("Project added successfully");
        const newProject = {
          ...projectData,
          id: projectId,
          photoURLs: selectedImageUrl,
        };
        setProjects(
          (prevProjects) => [...prevProjects, newProject] as ProjectWithId[]
        );
        setIsPopupVisible(false);
        setProjectName("");
        setStackProject("");
        setImageFile(null);
        setImagePreview(null);
        setUploadProgress(0);
        setSelectedImageUrl([]);
      } else {
        console.error("Error creating project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditButtonClick = (project: ProjectWithId) => {
    setEditingProject(project);
    setProjectName(project.projectName);
    setStackProject(project.stackProject);

    setSelectedImageUrl(project.photoURLs);
    setImagePreview(project.photoURLs[0]);
    setIsPopupVisible(true);
  };

  const handleEditProject = async () => {
    if (!editingProject || !authUser) {
      console.error(
        "No project selected for editing or user not authenticated"
      );
      return;
    }
    setIsLoading(true);
    try {
      const updatedData: Project = {
        projectName,
        stackProject,
        photoURLs: selectedImageUrl,
      };
      await updateUserProject(authUser.uid, editingProject.id, updatedData);
      const updatedProjects = projects.map((project) =>
        project.id === editingProject.id ? { ...project, ...updatedData } : project
      );
      setProjects(updatedProjects);
      setIsPopupVisible(false);
    } catch (error) {
      console.error("Error editing project:", error);
    } finally {
      setIsLoading(false);
      // Clear editing state
      setEditingProject(null);
      setProjectName("");
      setStackProject("");
      setSelectedImageUrl([]); // Réinitialiser les URLs des images
      setImagePreview(null);
    }
  };
  

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteUserProject(authUser.uid, projectId);
      setProjects(projects.filter((project) => project.id !== projectId));
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <Typography variant="h1">Projets</Typography>
      <Button variant="accent" action={() => setIsPopupVisible(true)}>
        Nouveau projet
      </Button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <div>
              <Typography theme="white" variant="h3">
                Nom du projet :{project.projectName}
              </Typography>
              <Typography theme="white" variant="body-base">
                Stack du projet: {project.stackProject}
              </Typography>
              {project.photoURLs.map((photoURL, index) => (
                <img key={index} src={photoURL} alt={project.projectName} />
              ))}
              <Button action={() => handleEditButtonClick(project)}>
                Edit
              </Button>
              <Button action={() => handleDeleteProject(project.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setIsPopupVisible(false)}>
              &times;
            </span>
            <Typography variant="h2" theme="white">
              Nouveau projet
            </Typography>
            <div>
              <label className="text-white">Nom du projet:</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-white">Stack du projet:</label>
              <input
                type="text"
                value={stackProject}
                onChange={(e) => setStackProject(e.target.value)}
              />
            </div>
            <UploadImages
              handleImageSelect={handleImageSelect}
              imagePreview={imagePreview}
              uploadProgress={uploadProgress}
              isLoading={isLoading}
            />
            <Button
              action={editingProject ? handleEditProject : handleAddProject}
              disabled={isLoading}
            >
              {isLoading
                ? "Chargement..."
                : editingProject
                ? "Modifier projet"
                : "Ajouter projet"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
