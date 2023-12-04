import { Typography } from "@/ui/design-system/typography/typography";
import { Container } from "../container/container";
import Image from "next/image";
import {footerLinks} from "./app-links";
import { v4 as uuidv4 } from "uuid"; //Permet de générer un id unique automatiquement
import { ActiveLink } from "./active-link";
import { FooterLinks } from "@/types/app-links";
import { LinkTypes } from "@/lib/link-type";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerNavigationList = footerLinks.map((colomnLinks) => (
     <FooterLink key={uuidv4()} data={colomnLinks}/> 
  ));

  return (
    <div className="bg-gray-600 ">
      <Container className="flex justify-between pt-16">
        {/* justify-between = une div de chaque coté */}
        <div className="flex flex-col items-center gap-1">
          <Typography variant="caption1" theme="white" weight="medium">
            Suis nous
          </Typography>
          <Typography variant="caption3" theme="mediumGray">
            Abonne toi à la chaine
          </Typography>
          <a href="http://www.instagram.com/adatechschool" target="_blank">
            <Image
              src="/assets/svg/instagram-logo.svg"
              width={229}
              height={216}
              alt="logo slack"
            />
          </a>
        </div>
        <div className="flex gap-7">{footerNavigationList}</div>
      </Container>
      <Container className="pt-9 pb-11 space-y-11">
        <hr className="text-gray-800 " />
        <div className="flex items-center justify-between">
          <Typography className="" variant="caption4" theme="mediumGray">
            {`Copyright & Copy © ${currentYear} | Propulsed by `}
            <a
              href="https://github.com/BastienVintras"
              target="_blank"
              className="underline hover:text-gray-600"
            >
              Bastien Vintras
            </a>
          </Typography>
          <div></div>
        </div>
      </Container>
    </div>
  );
};


interface footerLinkProps{
data:FooterLinks;
}
const FooterLink = ({data}:footerLinkProps) => {
  const linksList = data.links.map((link) => (
    <div key={uuidv4()}>
      {link.type === LinkTypes.INTERNAL && ( //condition si lien interne
        <ActiveLink href={link.baseUrl}>{link.label}</ActiveLink>
      )}
      {link.type === LinkTypes.EXTERNAL && ( //condition si lien externe   Voir dans link-type.tsx
        <a href={link.baseUrl} target="_blank">
          {link.label}
        </a>
      )}
    </div>
  ));

  return (
    <div className="min-w-[190px]">
      <Typography
        theme="white"
        variant="caption2"
        weight="medium"
        className="pb-5"
      >
        {data.label}
      </Typography>

      <Typography theme="black" variant="caption3" className="space-y-4">
        {linksList}
      </Typography>
    </div>
  );
};
