import { LinkTypes } from "@/lib/link-type";
import { Container } from "@/ui/components/container/container";
import { Button } from "@/ui/design-system/button/button";
import { Logo } from "@/ui/design-system/logo/logo";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";

export const AdaSlack = () => {
  return (
    <Container className="flex justify-between">
      <div className="flex flex-col justify-center max-w-2xl space-y-5">
        <div className="flex items-end gap-2">
          <Logo size="medium" />
          <Typography variant="caption2" component="span" weight="medium">
            L'AFTER
          </Typography>
        </div>
        <Typography 
        variant="h2" 
        component="h2" 
        >
            Rejoins-nous sur le Slack des alumnis Ada
          </Typography>
          <Typography 
          variant="body-lg" 
          component="p"
          theme="gray"
          className="max-w-lg" 
        >
            Rejoins-nous et partage tes connaissances ou obtiens de l'aide et des conseils{" "}
          </Typography>
          <Button baseUrl="https://ada-tech-school.slack.com" linkType={LinkTypes.EXTERNAL}>
            Rejoindre le groupe d'aide
          </Button>
      </div>
      <div className="relative w-[600px] h-[600px]">
        <Image fill src={"/assets/svg/slack.svg"} alt="Groupe Slack Ada" />
      </div>
    </Container>
  );
};
