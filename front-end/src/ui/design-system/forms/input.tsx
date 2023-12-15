import clsx from "clsx";
import { Typography } from "../typography/typography";

interface Props{
    isLoading: boolean;
    placeholder: string;
    type?:"text"|"email"|"password";
    register:any;
    errors:any;
    errorMsg?:string;
    id:string;
    required?: boolean;
    isAutocompleted?: boolean;

}

export const Input =({
    isLoading,
    placeholder,
    type = "text",
    register,
    errors,
    errorMsg= "Tu dois renseigner ce champs",
    id,
    required=true,
    isAutocompleted =false}:Props)=>{
        
    return(
        <div className="space-y-2">
       
        <input 
        type={type}
        placeholder={placeholder}
        className={clsx(isLoading && "cursor-not-allowed",
            errors[id]
             ?"placeholder-alert-danger text-alert-danger"
             :" placeholder-gray-600",
            "w-full p-4 font-light border border-gray-400 rounded focus:outline-none focus:ring-4 focus:ring-primary"
        )}
        disabled={isLoading}
        {...register(id, {
          required: {
            value: required,
            message: errorMsg,
          },
        })}
        autoComplete={isAutocompleted ? "on":"off"} // Cela sert a ce que le serveur ne propose pas une autocomplétion, évite les erreurs pour les utilisateurs
      />

      {errors[id] && (
        <Typography variant="caption4" component="div" theme="danger">
{errors[id]?.message}
        </Typography>
      )}
      </div>
    )
}