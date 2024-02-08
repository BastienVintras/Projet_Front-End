import { Button } from "@/ui/design-system/button/button"
import { Typography } from "@/ui/design-system/typography/typography"
import Image from "next/image"

export const CallsToActionSideBarContribution = ()=>{
    return(
        <div className="relative flex flex-col justify-center gap-5 px-8 py-12 overflow-hidden rounded pb-44 bg-primary">
<Typography 
variant="lead"
theme="white"
weight="medium"
className="text-center"
>
texte a Voir
</Typography>
<div className="flex justify-center">
    <Button
    variant="success"
    baseUrl="http://google.com"
    linkType="external"
    >
        Clic ici pour voir
    </Button>
</div>
<div>
    <Image
    width={183}
    height={183}
    src="/assets/svg/rubix.svg"
    alt="image rubixcube"
    className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
    />
</div>

        </div>
    )
}