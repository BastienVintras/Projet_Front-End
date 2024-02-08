import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/seo";
import { ProfileContainer } from "@/ui/modules/user-profile/profile/profile.container";



//import { Layout } from "@/ui/components/layout/layout";
export default function UserAccount() {
  return (
    <>
       <Seo
        title="Mon espace"
        description="Mon espace"
        /> 
      {/* sessionStatus est une propriété Props*/}      
      <Layout withSideBar sessionStatus={REGISTERED}>
        {/* REGISTERED est dans lib/session-status.tsx */}
     <ProfileContainer/>
        </Layout>
      </>
        
  );
}
