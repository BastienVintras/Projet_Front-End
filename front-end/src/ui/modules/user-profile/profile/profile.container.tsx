import { useAuth } from "@/context/authUserContext";
import { ProfileView } from "./profile-view";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProfileFormFieldsType } from "@/types/forms";

export const ProfileContainer = () => {
  const { authUser } = useAuth();
  const { value: isLoading, setValue: setLoading } = useToggle();

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
    setError,
  } = useForm<UserProfileFormFieldsType>();

  const handleUpdateUserDocument = async (
    formData: UserProfileFormFieldsType
  ) => {
    setLoading(true);
    console.log(formData);
    setLoading(false);
  };

  const onSubmit: SubmitHandler<UserProfileFormFieldsType> = async (
    formData
  ) => {
    handleUpdateUserDocument(formData);
    return;
  };

  console.log("authUser", authUser);

  return (
    <ProfileView
      form={{
        errors,
        control,
        register,
        handleSubmit,
        onSubmit,
        isLoading,
      }}
    />
  );
};
