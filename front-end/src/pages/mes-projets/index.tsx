import { REGISTERED } from "@/lib/session-status";
import { Project } from "@/types/user";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/seo";
import { UploadImages } from "@/ui/components/upload-images/upload-images";
import { Button } from "@/ui/design-system/button/button";
import { ImageProject } from "@/ui/design-system/image-project/image-project";
import { ProfileContainer } from "@/ui/modules/user-profile/profile/profile.container";
import { ProjectsPage } from "@/ui/modules/user-projects/user-projects-container";
import { ChangeEvent, SetStateAction } from "react";
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
     
     <ProjectsPage/>
        </Layout>
      </>
        
  );
}
