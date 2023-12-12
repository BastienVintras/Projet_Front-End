import { Breadcrumbs } from "../breadcrumbs/breadcrumbs"
import { Footer } from "../navigation/footer"
import { Navigation } from "../navigation/navigation"

interface Props{
    children: React.ReactNode
    isDisplayBreadcrumbs?: boolean;
}
export const Layout=({children, isDisplayBreadcrumbs=true}:Props)=>{
    return(
        <>
        <Navigation/>
        {isDisplayBreadcrumbs && <Breadcrumbs/>}
        {children}
        <Footer/>
        </>
    )
}