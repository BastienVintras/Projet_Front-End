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
  theme?: "black" | "white" | "grey" | "primary" | "secondary";
  weight?: "regular" | "medium";
  className?: string;

  // Cela signifie que children peut être n'importe quel élément React valide,
  // y compris des composants React, des chaînes de texte, des éléments HTML,
  // ou même des tableaux d'éléments React.
  children: React.ReactNode;
}
// Cette partie définit une interface TypeScript appelée Props.
// Dans le contexte de React, les composants fonctionnels peuvent accepter des propriétés (props) en tant que paramètres.
//le variant est definit en "h3" par defaut si il n 'est pas renseigné, pareil pour le component en "div"
export const Typography = ({
  variant = "h3",
  component: Component = "div",
  theme = "black",
  weight = "regular",
  className,
  children,
}: Props) => {
  let variantstyles: string = "";

  switch (variant) {
    case "display":
      variantstyles = "";
      break;
    case "h1":
      variantstyles = "";
    default:
      break;
  }

  // "clsx" = bibliotheque pour gérer de manière élégante et efficace les classes CSS conditionnelles.
  //  Elle permet de construire dynamiquement une chaîne de classes CSS en fonction de conditions.
  return (
    //Composant fonctionnel
    <Component className="{clsx(variantStyles,className)}">
      {children}
    </Component>
  );
};
