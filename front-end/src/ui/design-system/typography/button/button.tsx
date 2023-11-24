import clsx from "clsx";

interface Props {
  size?: "small" | "medium" | "large";
  variant?: "accent" | "secondary" | "outline" | "disabled" | "ico";
  icon?: any;
  iconTheme?: "accent" | "secondary" | "gray";
  iconPosition?: "left" | "right";
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
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
}: Props) => {
  let varianStyles: string = "",
    sizeStyles: string = "",
    icoSize: number = 0;

  switch (variant) {
    case "accent": //Default
      varianStyles = "bg-primary hover:primary-400 text-white rounded";

      break;
    case "secondary":
      varianStyles = "bg-primary-200 hover:primary-300/50 text-primary rounded"; //le /50 est la valeur de l opacité

      break;
    case "outline":
      varianStyles = "bg-white hover:bg-gray-400/50 border border-gray-500 text-gray-900 rounded";

      break;
    case "disabled":
      varianStyles = "bg-gray-400 border border-gray-500 text-gray-600 rounded cursor-not-allowed";

      break;
    case "ico":
      varianStyles = "";

      break;
  }

  switch (size) {
    case "small":"";
      sizeStyles = "text-caption3 font-medium px-[14px] py-[12px]";
      break;

    case "medium":"";//Default
      sizeStyles = "text-caption2 font-medium px-[18px] py-[15px]";
      break;

    case "large":"";
      sizeStyles = "text-caption1 font-medium px-[22px] py-[18px]";
      break;
  }

  return (
    <>
      <button
        type="button"
        className={clsx(varianStyles,sizeStyles,icoSize,"")}
        onClick={() => console.log("click")}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};
