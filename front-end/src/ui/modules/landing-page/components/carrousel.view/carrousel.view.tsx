// components/Carousel.js
import {
 EffectCube,
 Pagination,
 Navigation,
 Scrollbar

} from "swiper/modules";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css/autoplay";
import { Box } from "@/ui/design-system/box/box";

export interface FeaturedListInterface {
  imagePath: string;
  imageAlt: string;
  title: string;
  description: string;
}

const images = [
  {
    imagePath: "/assets/svg/compass.svg",
    imageAlt: "illustration",
    title: "Ressources",
    description: "Consulte et partage des ressources pour les dev",
  },
  {
    imagePath: "/assets/svg/diskette.svg",
    imageAlt: "illustration",
    title: "Entrainement",
    description: "Entraine-toi à devenir meilleur et trouve de l'inspiration",
  },
  {
    imagePath: "/assets/svg/gamepad.svg",
    imageAlt: "illustration",
    title: "Visibilité",
    description: "Expose tes projets et trouve des opportunités! ",
  },
  {
    imagePath: "/assets/svg/speaker.svg",
    imageAlt: "illustration",
    title: "Relations",
    description: "Connecte-toi avec des dev web et booste ta carriere",
  },
  
];


export const Carousel = () => {
  

  
  return (
    
    <Container className=" bg-gray-200 grid grid-cols-2 gap-20 mb-32  ">
      <div>
          <Swiper 
            // install Swiper modules
            effect={'cube'}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      onSwiper={(swiper)=>console.log(swiper)}
        cubeEffect={{
          shadow: false,
          slideShadows: false,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination,Navigation]}
        className="relative w-full h-[531px] bg-white"
          >
            {images.map((image, index) => (
              <SwiperSlide className="bg-center bg-cover" key={index}>
                <Image
                  src={image.imagePath}
                  alt={image.imageAlt}
                  width={100}
                  height="120"
                  className="block w-[200px] object-scale-down"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
          <div>
            <Box>
              <Typography>
                hello
              </Typography>
            </Box>
          </div>
          </Container>
          
  );
};
