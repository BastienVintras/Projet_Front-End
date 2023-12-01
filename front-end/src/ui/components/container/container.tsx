import clsx from "clsx";

interface Props{
    children : React.ReactNode;
    className : string;
}
export const Container=({children,className}:Props)=>{
    return(
        //lg:px-10 = si l ecran depasse 1024 px le padding passe de 20px(px-5) à 40px
        <div className={clsx(
            "w-full max-w-7xl mx-auto px-5 lg:px-10",
            className
            )}
            > 
            {children}

        </div>
    )
};