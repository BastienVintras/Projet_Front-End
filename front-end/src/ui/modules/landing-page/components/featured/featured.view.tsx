import { Container } from "@/ui/components/container/container";
import { SocialNetworksButtons } from "@/ui/components/navigation/social-networks-buttons";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
export interface FeaturedListInterface {
  imagePath: string;
  imageAlt: string;
  title: string;
  description: string;
}

const featuresData = [
  {
    imagePath: "/assets/svg/diskette.svg",
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
  const featuredList = featuresData.map((feature) => (
    <div
      key={uuidv4()}
      className="flex flex-col items-center justify-center bg-white rounded p-7"
    >
      {/* overflow-hidden permet  a la div image de ne pas depasse de son conteneur avec le blur    */}
      <div className="relative w-[130px] h-[130px] rounded-full mb-6 p-10 overflow-hidden">
        <Image
          fill
          src={feature.imagePath}
          alt="feature.imagePath"
          //blur donne l 'effet flouté de de l image en background
          className="object-scale-down blur-2xl"
        />
        <Image
          fill
          src={feature.imagePath}
          alt="feature.imagePath"
          //object-scale-down reduit la taille de l'element pour s'adapter a son conteneur
          className="object-scale-down"
        />
      </div>
      <Typography
        theme="black"
        variant="lead"
        component="h3"
        weight="medium"
        className="text-center mb-2.5 "
      >
        {feature.title}
      </Typography>
      <Typography
        theme="gray"
        variant="body-base"
        component="p"
        className="text-center"
      >
        {feature.description}
      </Typography>
    </div>
  ));

  return (
    <div className="bg-gray-400">
      <Container className="grid grid-cols-12 gap-24 py-24">
        <div className=" grid grid-cols-2 col-span-7 gap-7">{featuredList}</div>
        <div className=" flex flex-col justify-between col-span-5 gap-10">
          <div>
            <Typography
              variant="h2"
              component="h2"
              theme="black"
              className="mb-5"
            >
              Passe de la formation à la transmission
            </Typography>
            <Typography
              variant="body-lg"
              component="p"
              theme="gray"
              className="mb-8"
            >
              Du partage, des connections et de l'inspiration, notre app gère
              tout ça pour toi. Rejoins la communauté Ada et continue ton
              évolution. Let'go !{" "}
            </Typography>
            <Button
              variant="secondary"
              baseUrl="/connexion"
              icon={{ icon: RiArrowRightLine }}
              iconPosition="right"
            >
              Commencer
            </Button>
          </div>
          <div>
            <Typography
              variant="caption3"
              component="div"
              theme="gray"
              className="mb-4"
            >
              Nos réseaux sociaux
            </Typography>
            <SocialNetworksButtons />
          </div>
        </div>
      </Container>
    </div>
  );
};
