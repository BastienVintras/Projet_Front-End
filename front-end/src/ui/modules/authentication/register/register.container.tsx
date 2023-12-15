import { SubmitHandler,useForm } from "react-hook-form";
import { RegisterView } from "./register.view"
import { RegisterFormFieldsType } from "@/types/forms";
import { useState } from "react";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/config/firebase-config"

export const RegisterContainer =()=>{
const [isLoading,setIsLoading] = useState <boolean>(false) 
    const{
        handleSubmit,
        formState : {errors},
        register,
        setError,
        reset,
    } = useForm<RegisterFormFieldsType>();

const handleCreateUserAUthentication =({email,password,what_is_your_prom}:RegisterFormFieldsType)=>{

};
const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (formData)=>{
    setIsLoading(true)
console.log("formData",formData);

const{password} = formData;

if(password.length <= 5){
    setError("password",{
        type:"manual",
        message:
        "Ton mot de passe doit comporter au minimum 6 caractères",
    });
    return; // evite d 'executer la fonction suivante si il y a une erreur de password
}




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