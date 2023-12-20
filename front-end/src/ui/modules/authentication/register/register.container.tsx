import { SubmitHandler,useForm } from "react-hook-form";
import { RegisterView } from "./register.view"
import { RegisterFormFieldsType } from "@/types/forms";
import { firebaseCreateUser, sendEmailVerificationProcedure } from "@/api/authentication";
import {toast } from 'react-toastify';
import { useToggle } from "@/hooks/use-toggle";
import { firestoreCreateDocument} from "@/api/firestore";

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

const handleCreateUserDocument = async(collectionName: string, documentID: string, document: object)=>{
    const {error} = await firestoreCreateDocument(
        collectionName,
        documentID,
        document
        );
        if (error){
            toast.error(error.message);
            setIsLoading(false);
            return;
        }
        toast.success("Bienvenue sur l'After Ada ")
    setIsLoading(false);
    reset();
    sendEmailVerificationProcedure()
}

const handleCreateUserAuthentication = async ({
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
    
const userDocumentData = {
    email: email,
    what_is_your_prom: what_is_your_prom,
    uid: data.uid,
    creation_date: new Date(),
}
    handleCreateUserDocument("users", data.uid,userDocumentData)

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
handleCreateUserAuthentication(formData)



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