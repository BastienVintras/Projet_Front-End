/* eslint-disable react/no-unescaped-entities */
import { Container } from "@/ui/components/container/container"
import { Button } from "@/ui/design-system/button/button"
import { Typography } from "@/ui/design-system/typography/typography"
import Image from "next/image"

export const HeroTopView =()=>{
    return(
        <Container className="relative pt-40 pb-52 overflow-hidden">
            <div className="w-full max-w-2xl space-y-5">
<Typography variant="h1"component="h1"className="max-w-lg">
    Rejoins les Alumnis Ada
</Typography>
<Typography variant="body-lg" theme="gray" component="p"className="max-w-xl">
    Ici, on se prend pas la tête, mais on code comme des bêtes !
    Rejoins l'After, partage tes projets, inspire toi et fais toi des nouveaux contacts
</Typography>
<div className="space-x-5 pt-2.5">
<Button baseUrl="">Commencer</Button>
<Button baseUrl=""variant="secondary">En savoir plus</Button>
</div>
            </div>
            <Image src="/assets/svg/ballon.svg"
            alt="Illustation D'une fusée pour matérialiser l'évolution du level des dev front-end"
            width={380}
            height={596}
            className="pt-5 absolute top-0 right-0 z-0"
            />
        </Container>
    )
}