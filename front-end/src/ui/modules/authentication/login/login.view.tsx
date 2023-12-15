import { Box } from "@/ui/design-system/box/box"
import { Typography } from "@/ui/design-system/typography/typography"
import Link from "next/link"
import { Container } from "@/ui/components/container/container";

import Image from "next/image";
import { LoginForm } from "./login-form";
import { FormsType } from "@/types/forms";

interface Props {
  form: FormsType;
}
export const LoginView =({form}:Props)=>{
    return( 
        <Container className="grid grid-cols-2 gap-20 mb-32 ">
        <div className="flex items-center">
          <div className="relative w-full h-[531px]">
            <Image
              fill
              src="/assets/images/login.png"
              alt="bonhomme login"
              className="object-scale-down"
            />
          </div>
        </div>
        <div className="flex items-center py-40">
          <Box padding_y="5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" component="h1">
              Connexion
              </Typography>
              <div className="flex items-center gap-2">
                <Typography variant="caption4" component="span" theme="gray">
                  Tu n'as pas de compte ?
                </Typography>
                <Typography variant="caption4" component="span" theme="primary">
                  <Link href="/connexion/inscription">S'inscrire</Link>
                </Typography>
              </div>
            </div>
           <LoginForm form={form}/>
          </Box>
        </div>
      </Container>
    )
}