import { useAuth } from "@/context/authUserContext";

export const UserAccountContainer = () => {

  const {authUser} = useAuth()
  return <div className="flex justify-center pt-20 pb-40"></div>;
};
