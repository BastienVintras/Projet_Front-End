import { Layout } from "@/ui/components/layout/layout";
import { LandingPageContainer } from "@/ui/modules/landing-page/landing-page.container";
import { Seo } from "@/ui/components/seo/seo";
import { LoginContainer } from "@/ui/modules/authentication/login/login.container";
import { GUEST } from "@/lib/session-status-";


//import { Layout } from "@/ui/components/layout/layout";
export default function Connection() {
  return (
    <>
       <Seo
        title="connexion"
        description="page de connexion"
        /> 
      
      <Layout sessionStatus={GUEST}>
      <LoginContainer/>
        </Layout>
      </>
        
  );
}
