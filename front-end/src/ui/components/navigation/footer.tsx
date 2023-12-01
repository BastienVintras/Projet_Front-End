import { Typography } from "@/ui/design-system/typography/typography";
import { Container } from "../container/container"
import Image from "next/image";

export const Footer=()=>{

const currentYear = new Date().getFullYear();

    return(
    <div className="bg-gray-700 ">
<Container className="flex justify-between pt-16">{/* justify-between = une div de chaque coté */}
    <div className="flex flex-col items-center gap-1">
        <Typography
        variant="caption1"
        theme="white"
        weight="medium"
        >
            Suis nous
        </Typography>
        <Typography variant="caption3"theme="mediumGray">
            Abonne toi à la chaine
        </Typography>
        <a href="http://www.instagram.com/adatechschool"target="_blank">
            <Image
            src="/assets/svg/instagram-logo.svg"
            width={229}
            height={216}
            alt="logo slack"
            />
        </a>
    </div>
    <div className="">
        Liste de liens
    </div>

</Container>
<Container className="pt-9 pb-11 space-y-11">
    <hr className="text-gray-800 " />
    <div className="flex items-center justify-between">
        <Typography className="" variant="caption4" theme="mediumGray">
            {`Copyright & Copy © ${currentYear} | Propulsed by `}
<a href="https://github.com/BastienVintras"target="_blank" className="underline hover:text-gray-600">Bastien Vintras</a>
            
        </Typography>
        <div></div>
    </div>

    
</Container>

    </div>
    );
};
