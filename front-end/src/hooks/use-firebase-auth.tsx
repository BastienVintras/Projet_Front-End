import { UserInterface } from "@/types/user";
import { useState } from "react";

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<UserInterface | null>(null) //null si l'utilisateur n 'est pas connecté
}
