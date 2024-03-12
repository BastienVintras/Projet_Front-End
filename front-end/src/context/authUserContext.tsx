//Cette déclaration importe un hook personnalisé pour gérer l'authentification avec Firebase.
// Il contient une logique liée à l'authentification des utilisateurs à l'aide de Firebase.
import useFirebaseAuth from "@/hooks/use-firebase-auth"
import { UserDocument} from "@/types/user"
import { useContext,createContext } from "react"

//Cette constante définit un objet d'état initial avec des propriétés représentant divers détails de l'utilisateur.
// La propriété userDocument est initialisée comme un objet vide de type UserDocument.
const init = {
    uid: "",
    email: "",
    displayName:"",
    emailVerified : false,
    phoneNumber: "",
    photoURL: "",
    userDocument: {} as UserDocument,
    
}

const authUserContext = createContext({
    authUser : init,
    authUserIsLoading: true,
    reloadAuthUserData:()=>{}
})
interface Props{
    children: React.ReactNode
}

export function AuthUserProvider({children}:Props){

const auth = useFirebaseAuth()

    return(
<authUserContext.Provider
value={
    {
    authUser:auth.authUser as {
        uid:string;
        email:string;
        displayName:string;
        emailVerified:boolean;
        phoneNumber:string;
        photoURL:string;
        userDocument:UserDocument;
        
    },
    authUserIsLoading:auth.authUserIsLoading ,
    reloadAuthUserData : auth.reloadAuthUserData,
}
}
>
    {children}
</authUserContext.Provider>
    );
}
// Les composants utilisant ce hook auront accès aux valeurs authUser et authUserIsLoading.
export const useAuth = () => useContext(authUserContext)
