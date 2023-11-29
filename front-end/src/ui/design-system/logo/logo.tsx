interface Props {
  size?: "very-small" | "small" | "medium" | "large";
}

export const Logo = ({ size = "medium" }: Props) => {
  let sizeLogo: number;

  switch (size) {
    case "very-small":
      sizeLogo = 0;
      break;

    case "small":
      sizeLogo = 0;
      break;

    case "medium":
      sizeLogo = 0;
      break;

    case "large":
      sizeLogo = 0;
      break;
  }
  return;
  <></>;
};
