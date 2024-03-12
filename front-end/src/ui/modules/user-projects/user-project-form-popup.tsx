import React, { useState } from "react";
import { Project } from "@/types/user";
import { Button } from "@/ui/design-system/button/button";
import { UploadImages } from "@/ui/components/upload-images/upload-images";
import { useAuth } from "@/context/authUserContext";
import { addUserProject } from "./addUserProject"; // Chemin correct vers addUserProject

export const NewProjectPopup = () => {
  const { authUser } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [stackProject, setStackProject] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Ajouter un état pour stocker le fichier d'image sélectionné
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file); // Stocker le fichier d'image sélectionné dans l'état
    }
  };

  const handleAddProject = async () => {
    if (!authUser || !imageFile) { // Vérifier si l'utilisateur est authentifié et si un fichier d'image est sélectionné
      console.error("User not authenticated or image file not selected");
      return;
    }
    setIsLoading(true);
    try {
      const projectData: Project = {
        projectName,
        stackProject,
      };
      const projectId = await addUserProject(authUser.uid, projectData, imageFile); // Passer le fichier d'image à la fonction addUserProject
      if (projectId) {
        console.log("Project added successfully");
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

  return (
    <>
      <Button action={() => setIsPopupVisible(true)}>Nouveau projet</Button>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setIsPopupVisible(false)}>
              &times;
            </span>
            <h2>Nouveau projet</h2>
            <div>
              <label>Nom du projet:</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <label>Stack du projet:</label>
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
    </>
  );
};
