import clsx from "clsx";

interface Props {
  variant?: //propiete optionnelle
  | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "lead"
    | "body-lg"
    | "body-base"
    | "body-sm"
    | "caption1"
    | "caption2"
    | "caption3"
    | "caption4";

  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
  theme?: "black" | "white" | "gray" | "primary" | "secondary"|"mediumGray"|"danger"|"success"|"warning";
  weight?: "regular" | "medium";
  className?: string;

  // Cela signifie que children peut être n'importe quel élément React valide,
  // y compris des composants React, des chaînes de texte, des éléments HTML,
  // ou même des tableaux d'éléments React.
  children: React.ReactNode;
}
// Cette partie définit une interface TypeScript appelée Props.
// Dans le contexte de React, les composants fonctionnels peuvent accepter des propriétés (props) en tant que paramètres.
//le variant est definit en "h3" par defaut si il n 'est pas renseigné, pareil pour le component en "div",theme et weight
export const Typography = ({
  variant = "h3",
  component: Component = "div",
  theme = "white",
  weight = "regular",
  className,
  children,
}: Props) => {
  let variantStyles: string = "",
    colorStyles: string = "";

  switch (variant) {
    case "display":
      variantStyles = "text-8xl";
      break;
    case "h1":
      variantStyles = "text-7xl";
      break;
    case "h2":
      variantStyles = "text-6xl";
      break;
    case "h3": //Default
      variantStyles = "text-5xl";
      break;
    case "h4":
      variantStyles = "text-4xl";
      break;
    case "h5":
      variantStyles = "text-3xl";
      break;
    case "lead":
      variantStyles = "text-2xl";
      break;
    case "body-lg":
      variantStyles = "text-lg";
      break;
    case "body-base":
      variantStyles = "text-base";
      break;
    case "body-sm":
      variantStyles = "text-sm";
      break;
    case "caption1":
      variantStyles = "text-caption1";
      break;
    case "caption2":
      variantStyles = "text-caption2";
      break;
    case "caption3":
      variantStyles = "text-caption3";
      break;
    case "caption4":
      variantStyles = "text-caption4";
      break;
  }

  switch (theme) {
    case "black"://default
      colorStyles = "text-gray";

      break;
    case "gray":
      colorStyles = "text-gray-700";

      break;
    case "white":
      colorStyles = "text-white";

      break;
    case "primary":
      colorStyles = "text-primary";

      break;
    case "secondary":
      colorStyles = "text-secondary";
      break;
      case "mediumGray":
        colorStyles = "text-gray-800";
        break;
        case "danger":
        colorStyles = "text-alert-danger";
        break;
        case "success":
        colorStyles = "text-alert-success";
        break;
        case "warning":
        colorStyles = "text-alert-warning";
        break;
  }
  // "clsx" = bibliotheque pour gérer de manière élégante et efficace les classes CSS conditionnelles.
  //  Elle permet de construire dynamiquement une chaîne de classes CSS en fonction de conditions.
  return (
    //Composant fonctionnel
    <Component
      className={clsx(
      variantStyles,
      colorStyles,
      weight==="medium" &&"font-medium",
      className,
      
      )}
    >
      {children}
    </Component>
  );
};
