import { Layout } from "@/ui/components/layout/layout";
import { LandingPageContainer } from "@/ui/modules/landing-page/landing-page.container";
import { Seo } from "@/ui/components/seo/seo";


//import { Layout } from "@/ui/components/layout/layout";
export default function Home() {
  return (
    <>
       <Seo
        title="Accueil After Ada"
        description="Accueil After Ada"
        /> 
      {/* <Layout> */}
      <Layout isDisplayBreadcrumbs = {false}>
      <LandingPageContainer/>
        </Layout>
      </>
        
  );
}
