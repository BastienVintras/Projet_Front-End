import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
export interface FeaturedListInterface {
  imagePath: string;
  imageAlt: string;
  title: string;
  description: string;
}

const featuresData = [
  {
    imagePath: "/assets/svg/disquette.svg",
    imageAlt: "illustration",
    title: "Ressources",
    description: "Consulte et partage des ressources pour les dev",
  },
  {
    imagePath: "/assets/svg/gamepad.svg",
    imageAlt: "illustration",
    title: "Entrainement",
    description: "Entraine-toi à devenir meilleur et trouve de l'inspiration",
  },
  {
    imagePath: "/assets/svg/speaker.svg",
    imageAlt: "illustration",
    title: "Visibilité",
    description: "Expose tes projets et trouve des opportunités! ",
  },
  {
    imagePath: "/assets/svg/compass.svg",
    imageAlt: "illustration",
    title: "Relations",
    description: "Connecte-toi avec des dev web et booste ta carriere",
  },
];

export const FeaturedView = () => {
  const featuredList = featuresData.map((feature) =>(
<div key={uuidv4()} className="flex flex-col items-center justify-center bg-white rounded p-7"
>
<div className="relative w-[130px] h-[130px] rounded-full mb-6 p-10 bg-gray-400">
    <Image
    fill
    src={feature.imagePath}
    alt="feature.imagePath"
    className="object-scale-down" />
</div>
<Typography theme="black" variant="lead" component="h3" weight="medium"className="text-center mb-2.5 ">
    {feature.title}
</Typography>
<Typography theme="gray" variant="body-base" component="p" className="text-center">
    {feature.description}
</Typography>
</div>
  ))
    
  

  return (
    <div className="bg-gray-500">
      <Container className="grid grid-cols-12 gap-24 py-24">
        <div className=" grid grid-cols-2 col-span-7 gap-7">{featuredList}</div>
        <div className=" col-span-5"></div>
      </Container>
    </div>
  );
};
