import { Layout } from "@/ui/components/layout/layout";
import { LandingPageContainer } from "@/ui/modules/landing-page/landing-page.container";
import { Seo } from "@/ui/components/seo/seo";
import { ForgetPasswordContainer } from "@/ui/modules/authentication/forget-password/forget-password.container";


//import { Layout } from "@/ui/components/layout/layout";
export default function ForgetPassword() {
  return (
    <>
       <Seo
        title="connexion"
        description="connexion"
        /> 
      {/* <Layout> */}
      <Layout>
      <ForgetPasswordContainer/>
        </Layout>
      </>
        
  );
}