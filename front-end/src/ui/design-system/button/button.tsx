import { IconProps } from "@/types/iconProps";
import clsx from "clsx";
import { Spinner } from "../spinner/spinner";
import { LinkType, LinkTypes } from "@/lib/link-type";
import Link from "next/link";

interface Props {
  size?: "small" | "medium" | "large";
  variant?: "accent" | "secondary" | "outline" | "disabled" | "ico";
  icon?:IconProps;
  iconTheme?: "accent" | "secondary" | "gray";
  iconPosition?: "left" | "right";
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  baseUrl? : string,
  linkType?:LinkType,
  action?: Function
}
export const Button = ({
  size = "medium",
  variant = "accent",
  icon,
  iconTheme = "accent",
  iconPosition = "right",
  disabled,
  isLoading,
  children,
  baseUrl,
  linkType = "internal",
  action = ()=>{}
}: Props) => {
  let variantStyles: string = "",
    sizeStyles: string = "",
    icoSize: number = 0;

  switch (variant) {
    case "accent": //Default
      variantStyles = "bg-primary hover:bg-primary-400 text-white rounded";

      break;
    case "secondary":
      variantStyles = "bg-primary-200 hover:bg-primary-300/50 text-primary rounded"; //le /50 est la valeur de l opacité

      break;
    case "outline":
      variantStyles = "bg-white hover:bg-gray-400/50 border border-gray-500 text-gray-900 rounded";

      break;
    case "disabled":
      variantStyles = "bg-gray-400 border border-gray-500 text-gray-600 rounded cursor-not-allowed";

      break;
    case "ico":
     if (iconTheme === "accent"){
variantStyles= 
"bg-primary hover:bg-primary-400 text-white rounded-full";
     }
     if (iconTheme === "secondary"){
      variantStyles= 
      "bg-primary-300 hover:bg-primary-300/50 text-primary rounded-full"
    }
    if (iconTheme === "gray"){
      variantStyles= 
      "bg-gray-700 hover:bg-gray-600 text-white rounded-full"
    }

      break;
  }

  switch (size) {
    case "small":"";
      sizeStyles = `text-caption3 font-medium ${
        variant ==="ico"?"flex items-center justify-center w-[40px] h-[40px]":"px-[14px] py-[12px]"
      }`;
      icoSize = 18
      break;

    case "medium":"";//Default
      sizeStyles = `text-caption2 font-medium ${
        variant ==="ico"?"flex items-center justify-center w-[50px] h-[50px]": "px-[18px] py-[15px]"}`;
      icoSize = 20
      break;

    case "large":"";
      sizeStyles = `text-caption1 font-medium ${
        variant ==="ico"?"flex items-center justify-center w-[60px] h-[60px]":"px-[22px] py-[18px]"}`;
      icoSize = 24
      break;
  }
const handleClick = () => {
  if(action){
    action()
  }
}
  const buttonContent = (
    <>
    {isLoading && (
  <div className="absolute inset-0 flex items-center justify-center">
   {variant === "accent"|| variant ==="ico" ?(
   <Spinner size="small" variant="white"/>
   ):(
   <Spinner size="small"/>)}

  </div>
)}


       <div className={clsx(isLoading && "invisible")}>
        {/* Si c est une icone on affiche l icon dans un noeud "<> </>" sinon on affiche children */}
        {icon && variant ==="ico" ? (
        <icon.icon size={icoSize}/> 
        ):(
        // Si l icone existe la condition rentre dans cette classe la
         <div className= {clsx(icon && "flex items-center gap-1")}> 
         {icon && iconPosition ==="left"&&(<icon.icon size ={icoSize}/> )} {/*condition ternaire*/}
        
        {children}
        {icon && iconPosition ==="right"&&(<icon.icon size ={icoSize}/> )}
        </div>
        )} 
        </div> 
      
    </>
  )

  const buttonElement = (
    <button
    type="button"
    className={clsx(variantStyles,sizeStyles,icoSize,isLoading && "cursor-wait","relative animate")}//la position absolute du spinner est en fonction de la position relative dans le corp du bouton
    onClick= {handleClick}
    disabled={disabled}
  >
{buttonContent}
  </button>
  );
  //Si c est un lien externe on presise le linkType External et on va recuperer l Url externe dans baseUrl
if (baseUrl){
 if(linkType === LinkTypes.EXTERNAL){
  return(
    <a href={baseUrl} target="_blank">
      {buttonElement}
    </a>
  )
 }else {//sinon lien interne
  return <Link href={baseUrl}>{buttonElement}</Link>
 }
} 
 return buttonElement
  
};
