import React, { useState, useEffect } from "react";
import { Button } from "@/ui/design-system/button/button";
import { useAuth } from "@/context/authUserContext";
import { addUserProject, updateUserProject, deleteUserProject } from "./addUserProject"; // Import des fonctions déjà créées
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { Project } from '@/types/user';
import { Typography } from "@/ui/design-system/typography/typography";
import { UploadImages } from "@/ui/components/upload-images/upload-images";

interface ProjectWithId extends Project {
  id: string;
}

export const ProjectsPage = () => {
  const { authUser } = useAuth();
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [projectName, setProjectName] = useState("");
  const [stackProject, setStackProject] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchProjects = async () => {
      if (authUser) {
        try {
          const q = query(collection(db, 'users', authUser.uid, 'projects'));
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
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
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
      };
      const projectId = await addUserProject(authUser.uid, projectData, imageFile);
      if (projectId) {
        console.log("Project added successfully");
        const newProject = { ...projectData, id: projectId, photoURL: selectedImageUrl };
        setProjects(prevProjects => [...prevProjects, newProject]);
        setIsPopupVisible(false);
      } else {
        console.error("Error creating project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsLoading(false);
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
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <div>
              <Typography theme="white" variant="h3">Nom du projet :{project.projectName}</Typography>
              <Typography theme="white" variant="body-base">Stack du projet: {project.stackProject}</Typography>
              {project.photoURL && <img src={project.photoURL} alt={project.projectName} />}
              <Button>Edit</Button>
              <Button action={() => handleDeleteProject(project.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="accent" action={() => setIsPopupVisible(true)}>Nouveau projet</Button>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setIsPopupVisible(false)}>
              &times;
            </span>
            <Typography variant="h2" theme="white">Nouveau projet</Typography>
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
            <Button action={handleAddProject} disabled={isLoading}>
              {isLoading ? "Chargement..." : "Ajouter projet"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
