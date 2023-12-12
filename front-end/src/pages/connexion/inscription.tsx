import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { LandingPageContainer } from "@/ui/modules/landing-page/landing-page.container";
import { RegisterContainer } from "@/ui/modules/authentication/register/register.container";


//import { Layout } from "@/ui/components/layout/layout";
export default function Register() {
  return (
    <>
       <Seo
        title="inscription After Ada"
        description="page d'inscription"
        /> 
     
      <Layout>
      <RegisterContainer/>
        </Layout>
      </>
        
  );
}