import clsx from "clsx";
import Image from "next/image";
import { Spinner } from "../spinner/spinner";

interface Props {
    size?: "small" | "medium" | "large"|"extra-large";
    src: string;
    alt: string;
    isLoading?: boolean;
  }
  
  export const ImageProject = ({ size = "medium",src,alt,isLoading }: Props) => {
    let sizeStyles:string;
  
    switch (size) {
      
      case "small":
        sizeStyles = "w-24 h-24";
        break;
  
      case "medium"://Default
        sizeStyles = "w-[300px] h-[300px]";
        break;
  
      case "large":
        sizeStyles = "w-[400px] h-[400px]";
        break;

        case "extra-large":
        sizeStyles = "w-[500px] h-[500px]";
        break;
    }
return (
<div className={clsx(sizeStyles,
  isLoading && "flex items-center justify-center",
  "bg-gray-500 relative overflow-hidden")}>

    <div className={clsx(
      isLoading ? "opacity-40" : "opacity-0",
      "absolute z-10 w-full h-full bg-white animate"
    )}/>

    <Image
        fill 
        src={src ? src : "/assets/images/icon_plus.png"}
        alt={alt} 
        className={clsx(
          isLoading && "blur-[2px]",
          "object-cover object-center rounded-full animate"
        )}   
    />

    {isLoading && <Spinner className="relative z-20"/>}
</div>
)
    }