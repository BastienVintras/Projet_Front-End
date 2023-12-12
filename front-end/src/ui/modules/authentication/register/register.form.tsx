import { FormsType } from "@/types/forms"
import { Typography } from "@/ui/design-system/typography/typography"

interface Props{
    form: FormsType;
}
export const RegisterForm =({form}:Props)=>{
    const {
        control,
        onSubmit,
        errors,
        isLoading,
        register,
        handleSubmit} = form;
    
    console.log('form',form)
    return(
        <Typography>Formulaire...</Typography>
    )
}