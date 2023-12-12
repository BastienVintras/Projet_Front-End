import clsx from "clsx";

interface Props{
    children:React.ReactNode;
    className?:string;
    padding_x?:string;
    padding_y?:string;
}

export const Box =({children, className, padding_x,padding_y}:Props)=>{
    return(
        <div className={clsx(
            "w-full border border-gray-400 rounded",
            padding_x = "px-9",
            padding_y = "py-9",
            className
        )}>
            {children}
            </div>
    )
}