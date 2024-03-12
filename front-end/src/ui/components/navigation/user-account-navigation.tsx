import { Box } from "@/ui/design-system/box/box";
import { firebaseLogoutUser } from "@/api/authentication";
import { toast } from "react-toastify";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { ActiveLink } from "./active-link";
import router from "next/router";

export const UserAccountNavigation = () => {
  const handleLogOutUser = async () => {
    const { error } = await firebaseLogoutUser();
    if (error) {
      toast.error(error.message);
    }
    toast.success("A bientôt sur l'After");
    
  };

  return (
    <Box className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Typography variant="caption2" weight="medium">
          <ActiveLink href="/mon-espace">Mon compte</ActiveLink>
        </Typography>
        <Typography variant="caption2" weight="medium">
          <ActiveLink href="/mes-projets">Mes projets</ActiveLink>
        </Typography>
      </div>
      <Button action={handleLogOutUser} variant="danger">
        Déconnexion
      </Button>
    </Box>
  );
};
