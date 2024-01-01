import { useAuth } from "@/context/authUserContext"
import { Avatar } from "@/ui/design-system/avatar/avatar"
import { Typography } from "@/ui/design-system/typography/typography"
import Link from "next/link"

export const AccountAvatarNavigationLink = () => {
    const {authUser} = useAuth();

    const {photoURL, displayName} = authUser
    return(
        <Link href="/mon-espace"className="flex items-center gap-2">
            <Avatar src={photoURL} alt={displayName ? `avatar de ${displayName}` : "avatar de l'utilisateur"} size="large"/>
            <div className="max-w-[160px]">
                {/* truncate permet de limiter le champs du nom si il est trop long ici à 160px */}
                <Typography variant="caption2"weight="medium"className="truncate">
                    {displayName ? displayName : "Bienvenue"}
                </Typography>
                <Typography variant="caption4"weight="medium">
                    Mon compte
                </Typography>
            </div>
        </Link>
    )
}