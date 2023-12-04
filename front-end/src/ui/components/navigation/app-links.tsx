import { AppLinks } from "@/types/app-links";

const footerApplicationLinks:AppLinks[] =[
    {
        label: "Accueil",
        baseUrl : "/",
        type:"internal"
    },
    {
        label: "Projets",
        baseUrl : "/#",
        type:"internal"
    },
    {
        label: "Partages de liens",
        baseUrl : "/#",
        type:"internal"
    },
];

 const footerUsersLinks:AppLinks[] =[
    {
        label: "Mon espace",
        baseUrl : "/#",
        type:"internal"
    },
    {
        label: "Connexion",
        baseUrl : "/#",
        type:"internal"
    },
    {
        label: "Inscription",
        baseUrl : "/#",
        type:"internal"
    },
    {
        label: "Mot de passe oublié",
        baseUrl : "/#",
        type:"internal"
    }
];
  const footerInformationsLinks:AppLinks[] =[
    {
        label: "CGU",
        baseUrl : "/#",
        type:"internal"
    },
    {
        label: "Confidentialité",
        baseUrl : "/#",
        type:"internal"
    },
    {
        label: "A propos",
        baseUrl : "/#",
        type:"internal"
    },
    {
        label: "Contact",
        baseUrl : "/#",
        type:"internal"
    }
]
  const footerSocialNetworksLinks:AppLinks[] =[
    {
        label: "Instagram",
        baseUrl : "https://www.instagram.com/adatechschool",
        type:"external"
    },
    {
        label: "Linkedin",
        baseUrl : "https://www.linkedin.com/school/ada-tech-school/",
        type:"external"
    },
    {
        label: "Slack",
        baseUrl : "https://ada-tech-school.slack.com",
        type:"external"
    },
]

export const footerLinks = [
{
    label:"App",
    links:footerApplicationLinks
},
{
    label:"Utilisateurs",
    links:footerUsersLinks
},
{
    label:"Informations",
    links:footerInformationsLinks
},
{
    label:"Réseaux",
    links:footerSocialNetworksLinks
}
]