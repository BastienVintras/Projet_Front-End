import { Logo } from "@/ui/design-system/logo/logo";
import { Container } from "../container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { Button } from "@/ui/design-system/button/button";
import Link from "next/link";
import { ActiveLink } from "./active-link";
import { useAuth } from "@/context/authUserContext";
import { AccountAvatarNavigationLink } from "./account-avatar-navigation-link";

interface Props {}

export const Navigation = ({}: Props) => {
  const { authUser} = useAuth(); //useAuth provient de authUserContext.tsx
  console.log("authUser", authUser);
  
  const authentificationSystem = (
    <div className="flex items-center gap-2">
              <Button baseUrl="/connexion" size="small">
                Connection
              </Button>
              <Button
                baseUrl="connexion/inscription"
                size="small"
                variant="secondary"
              >
                Rejoindre
              </Button>
            </div>
  )

  return (
    <div className="border-b-2 border-gray-400">
      <Container className="flex items-center justify-between py-1.5 gap-7">
        <Link href="/">
          <div className="flex items-center gap-2.5">
            <Logo size="large" />
            <div className="flex flex-col">
              <div className="text-gray-400 font-extrabold text-[24px]">
                L'AFTER
              </div>
              <Typography variant="caption4" component="span" theme="gray">
                Trouve de l'inspiration & reçois des feedbacks !
              </Typography>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-7">
          <Typography
            variant="caption3"
            component="div"
            className="flex items-center gap-7"
          >
            <ActiveLink href="/design-system">Design system</ActiveLink>
            <Link href="/projets">Fils de discussion</Link>
            <Link href="/mes-projets">Projets</Link>
            <Link href="/contacts">Contacts</Link>
          </Typography>
         {!authUser ? authentificationSystem : <AccountAvatarNavigationLink/> }
            
          
        </div>
      </Container>
    </div>
  );
};
