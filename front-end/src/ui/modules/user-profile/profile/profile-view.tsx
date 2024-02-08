import { Typography } from "@/ui/design-system/typography/typography"
import { ProfileForm } from "./profile-form"
import { FormsType } from "@/types/forms";

interface Props{
    form: FormsType;
}

export const ProfileView = ({form}:Props) => {
    return(
        <div className="space-y-5">
        <Typography variant="h1" component="h1" theme="primary">
            Mon compte
        </Typography>
        <ProfileForm form={form}/>
        </div>
    )
}