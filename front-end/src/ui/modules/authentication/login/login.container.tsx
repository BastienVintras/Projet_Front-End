import { LoginFormFieldsType } from "@/types/forms";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginView } from "./login.view";
import { toast } from "react-toastify";
import { useToggle } from "@/hooks/use-toggle";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { firebaseSignInUser } from "@/api/authentication";
import { useRouter } from "next/router";
import { FormData } from "node-fetch-commonjs";

export const LoginContainer = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("user", user);
        // ...
      } else {
        console.log("tu n'es pas connecté");

        // User is signed out
        // ...
      }
    });
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    reset,
  } = useForm<LoginFormFieldsType>();

  const handleSignInUser = async ({
     email,
     password 
    }: LoginFormFieldsType) => {
    const { error } = await firebaseSignInUser(email, password);
    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }
    toast.success("Bienvenue sur l 'After Ada");
    setIsLoading(false);
    reset()
    //router.push("/mon-espace");
  };


  const onSubmit: SubmitHandler<LoginFormFieldsType> = async (formData) => {
    setIsLoading(true);
    const { password } = formData;
    if (password.length <= 5) {
      setError("password", {
        type: "manuel",
        message: "Ton mot de passe doit comporter au minimum 6 caractères",
      });
      setIsLoading(false);
      return;
    }
    handleSignInUser(formData)
  };

  return (
    <>
      <LoginView
        form={{
          errors,
          register,
          handleSubmit,
          onSubmit,
          isLoading,
        }}
      />
    </>
  );
};
