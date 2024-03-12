import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/seo";
import { UploadImages } from "@/ui/components/upload-images/upload-images";
import { Button } from "@/ui/design-system/button/button";
import { ImageProject } from "@/ui/design-system/image-project/image-project";
import { ProfileContainer } from "@/ui/modules/user-profile/profile/profile.container";
import  { NewProjectPopup } from "@/ui/modules/user-projects/user-project-form-popup";
import AddNewProject from "@/ui/modules/user-projects/user-projects-container";
import ProjectPage from "@/ui/modules/user-projects/user-projects-container";
import { ChangeEvent } from "react";
// import { ProjectPage } from "@/ui/modules/user-projects/ProjectPage";




//import { Layout } from "@/ui/components/layout/layout";
export default function UserAccount() {
  return (
    <>
       <Seo
        title="Mes projets"
        description="Mes projets"
        /> 
      {/* sessionStatus est une propriété Props*/}      
      <Layout  sessionStatus={REGISTERED}>
        {/* REGISTERED est dans lib/session-status.tsx */}
     {/* <ProfileContainer/> */}
     {/* <ProjectPage userId={""}  /> */}
     <NewProjectPopup/>
        </Layout>
      </>
        
  );
}
