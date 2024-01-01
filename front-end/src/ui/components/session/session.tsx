import { useAuth } from "@/context/authUserContext";
import { GUEST, REGISTERED } from "@/lib/session-status-";
import { SessionStatusTypes } from "@/types/session-status-types";
import { ScreenSpinner } from "@/ui/design-system/spinner/screen-spinner";
import { useRouter } from "next/router";


interface Props {
    children : React.ReactNode;
    sessionStatus?: SessionStatusTypes;
}

export const Session = ({children,sessionStatus}:Props)=>{
    const router = useRouter();
    const {authUserIsLoading, authUser} = useAuth();

    if (sessionStatus === GUEST && !authUserIsLoading) {
        if (!authUser) {
            return <>{children}</>
    }
    else {
        router.push("/mon-espace")
    }
    }

    if (sessionStatus === REGISTERED && !authUserIsLoading) {
        if (authUser) {
            return <>{children}</>
    }
    else {
        router.push("/connexion")
    }
    }
    if (!sessionStatus && !authUserIsLoading) {
        return <>{children}</>;
    }
    
    return <ScreenSpinner/>
};

// Session permet de mettre un loader en attendant la verification d authentification du User
// cela evite d 'avoir les boutons connexion et rejoindre qui apparaissent pendant le loading avant d afficher la 
// page de Onbording, 