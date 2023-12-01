import clsx from "clsx";
import Link from "next/link";
import{useRouter} from "next/router";
//useMemo est un crochet (hook) de gestion d'état dans React qui permet
//de mémoriser le résultat d'une fonction de calcul,
//afin d'éviter de la recalculer inutilement à chaque rendu du composant.
import {useMemo} from"react";


interface Props{
    href: string;
    children: React.ReactNode;
}

export const ActiveLink =({href,children}:Props)=>{
const router = useRouter();

console.log("router::",router.pathname);
console.log("href",href);



const isActive: boolean = useMemo(()=>{
return router.pathname === href
},[router.pathname ,href])//Si les informations de ce tableau change,useMemo va se reactivé.

    return(
        <Link href={href} className={clsx(isActive && "text-primary font-medium")}
        >
            {children}
        </Link>
    );
};