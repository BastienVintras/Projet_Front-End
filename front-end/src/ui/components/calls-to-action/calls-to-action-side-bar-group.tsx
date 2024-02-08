import { Button } from "@/ui/design-system/button/button"
import { Typography } from "@/ui/design-system/typography/typography"
import Image from "next/image"

export const CallsToActionSideBarGroup= ()=>{
    return(
        <div className="relative flex flex-col justify-center gap-5 px-8 py-12 overflow-hidden rounded pb-44 bg-gradient-to-b from-gray-400 to-secondary">
<Typography 
variant="lead"
theme="black"
weight="medium"
className="text-center"
>
Rejoins-nous sur le groupe
</Typography>
<div className="flex justify-center">
    <Button
    variant="black"
    baseUrl="http://slack.com"
    linkType="external"
    
    >
        Rejoindre
    </Button>
</div>
<div>
    <Image
    width={183}
    height={183}
    src="/assets/svg/slack.svg"
    alt="image slack"
    className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
    />
</div>

        </div>
    )
}