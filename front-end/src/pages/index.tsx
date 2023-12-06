//COMPONENTS
import { Container } from "@/ui/components/container/container";
import { Seo } from "@/ui/components/seo/seo";


// DESIGN SYSTEM
import { Avatar } from "@/ui/design-system/avatar/avatar";
import { Button } from "@/ui/design-system/button/button";
import { Logo } from "@/ui/design-system/logo/logo";
import { Typography } from "@/ui/design-system/typography/typography";
import { Spinner } from "@/ui/design-system/spinner/spinner";

//ICO
import { RiNotification2Fill, RiShieldUserLine } from "react-icons/ri";

import { Layout } from "@/ui/components/layout/layout";
import { LandingPageContainer } from "@/ui/modules/landing-page/landing-page.container";
//import { Layout } from "@/ui/components/layout/layout";
export default function Home() {
  return (
    <>
       <Seo
        title="Design System"
        description="Design system"
        /> 
      {/* <Layout> */}
      <Layout>
      <LandingPageContainer/>
        </Layout>
      </>
        
  );
}
