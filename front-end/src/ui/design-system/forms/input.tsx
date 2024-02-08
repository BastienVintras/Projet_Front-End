import clsx from "clsx";
import { Typography } from "../typography/typography";

interface Props{
    isLoading: boolean;
    placeholder: string;
    type?:"text"|"email"|"password"|"url";
    register:any;
    errors:any;
    errorMsg?:string;
    id:string;
    required?: boolean;
    isAutocompleted?: boolean;
    label?:string;

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
    isAutocompleted =false,
    label,
  }:Props)=>{
        
    return(
        <div className="space-y-2">
       {label && (
        <Typography
        variant="caption4"
        component="div"
        theme={errors[id] ? "danger" : "gray-400"}
        >
          {label}
          </Typography>
       )}

         <div className="flex items-center">
         {type ==="url" && (
            <div className="p-4 text-gray-600 border-l border-gray-400 rounded-l bg-gray-400/90 border-y">
                https://
            </div>
          )}

        <input 
        type={type}
        placeholder={placeholder}
        className={clsx(
          type ==="url" ? "rounded-r":"rounded",
          isLoading ?  "bg-gray-600 focus:ring-gray-400 cursor-not-allowed" : "bg-white" ,
            errors[id]
             ?"placeholder-alert-danger text-alert-danger"
             :" placeholder-gray-600",
            "w-full p-4 font-light border border-gray-400 focus:outline-none focus:ring-4 focus:ring-primary"
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
         </div>

      {errors[id] && (
        <Typography variant="caption4" component="div" theme="danger">
{errors[id]?.message}
        </Typography>
      )}
      </div>
    )
}