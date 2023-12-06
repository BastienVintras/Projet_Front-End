
import { RiFacebookBoxFill } from "react-icons/ri";
import {v4 as uuidv4 } from "uuid"
import { footerSocialNetworksLinks } from "./app-links"
import { Button } from "@/ui/design-system/button/button"
import clsx from "clsx";
import { LinkTypes } from "@/lib/link-type";


interface Props{
    theme?:"gray"|"accent"|"secondary";
    className?: string
}
export const SocialNetworksButtons =({className,
    theme ="accent",
}:Props)=>{
    
    const icoList = footerSocialNetworksLinks.map((socialNetwork)=>(
<Button key={uuidv4()}
variant ="ico"
iconTheme={theme}
icon={{
    icon:
     socialNetwork.icon ?
      socialNetwork.icon 
      : RiFacebookBoxFill
      }} //Si un icon est oublié l'icon facebook sera mis par defaut
      baseUrl={socialNetwork.baseUrl}
      //@ts-ignore
      linkType={socialNetwork.type}
/>
    ))
    
    return(
        <div className={clsx(className,"flex items-center gap-2.5")}>{icoList}</div>
    )
}