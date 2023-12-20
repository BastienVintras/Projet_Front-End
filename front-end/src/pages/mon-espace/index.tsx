import { Layout } from "@/ui/components/layout/layout";

import { Seo } from "@/ui/components/seo/seo";
import { UserAccountContainer } from "@/ui/modules/user-profile/user-account/user-account.container";



//import { Layout } from "@/ui/components/layout/layout";
export default function Connection() {
  return (
    <>
       <Seo
        title="Mon espace"
        description="Mon espace"
        /> 
      {/* <Layout> */}
      <Layout withSideBar>
     <UserAccountContainer/>
        </Layout>
      </>
        
  );
}
