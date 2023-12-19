import { SubmitHandler,useForm } from "react-hook-form";
import { RegisterView } from "./register.view"
import { RegisterFormFieldsType } from "@/types/forms";
import { firebaseCreateUser } from "@/api/authentication";
import {toast } from 'react-toastify';
import { useToggle } from "@/hooks/use-toggle";

export const RegisterContainer =()=>{
const{
    value : isLoading,
    setValue : setIsLoading, 
} = useToggle()
    
const{
        handleSubmit,
        formState : {errors},
        register,
        setError,
        reset,
    } = useForm<RegisterFormFieldsType>();

const handleCreateUserAUthentication = async ({
    email,
    password,
    what_is_your_prom
}:RegisterFormFieldsType)=>{
    const {error,data} = await firebaseCreateUser(email,password);
    if(error){
        setIsLoading(false)
        toast.error(error.message)
        return;
    }

    toast.success("Bienvenue sur l'After Ada ")
    setIsLoading(false);
    reset();

};
const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (formData)=>{
    setIsLoading(true)


const{password} = formData;

if(password.length <= 5){
    setError("password",{
        type:"manual",
        message:
        "Ton mot de passe doit comporter au minimum 6 caractères",
    });
    return; // evite d 'executer la fonction suivante si il y a une erreur de password
}
handleCreateUserAUthentication(formData)



}

    return(
        
        <RegisterView
        form={{
            errors,
            register,
            handleSubmit,
            onSubmit,
            isLoading,
        }}       
        />
    )
};