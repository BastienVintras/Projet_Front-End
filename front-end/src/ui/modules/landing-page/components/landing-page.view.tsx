import { AdaSlack } from "./ada-slack/ada-slack.view";
import { Carousel } from "./carrousel.view/carrousel.view";
import { FeaturedView } from "./featured/featured.view";
import { HeroTopView } from "./hero-top/hero-top.view";

export const LandingPageView =()=>{
    return (
    <>
    <HeroTopView/>
    <FeaturedView/>
    <AdaSlack/>
    
    </>
    );
};