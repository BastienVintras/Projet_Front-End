import { ForgetPasswordFormFieldsType } from "@/types/forms";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgetPasswordView } from "./forget-password.view";
import { sendEmailToResetPassword } from "@/api/authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const ForgetPasswordContainer = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ForgetPasswordFormFieldsType>();

  const handleResetPassword = async ({
    email,
  }: ForgetPasswordFormFieldsType) => {
    const { error } = await sendEmailToResetPassword(email);
    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }
    toast.success(`Un e-mail a été expédié à l'adresse ${email}`);
    setIsLoading(false);
    reset();
    router.push("/connexion");
  };

  const onSubmit: SubmitHandler<ForgetPasswordFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    handleResetPassword(formData);
  };

  return (
    <>
      <ForgetPasswordView
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
