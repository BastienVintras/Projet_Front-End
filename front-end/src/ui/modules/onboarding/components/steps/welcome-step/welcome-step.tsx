import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";

export const WelcomeStep = ({
  next,
  isFirstStep,
  isFinalStep,
  stepList,
  getCurrentStep,
}: BaseComponentProps) => {
  return (
    //pb-[91]px pour soustraire le footer de la hauteur totale de lécran(h-screen)
    <div className="relative h-screen pb-[91px]"> 
      <div className="h-full overflow-auto">
        <Container className="grid h-full grid-cols-12">
          <div className="relative z-10 flex items-center h-full col-span-6 py-10">
            <div className="w-full space-y-5 pb-4.5">
                <OnboardingTabs
                    tabs={stepList}
                    getCurrentStep={getCurrentStep}
                />
                <Typography variant="h1" component="h1">
                    Bienvenue sur l'appli de l' After !
                </Typography>
                <Typography variant="body-base" component="p" theme="gray">
                Viens traîner avec des développeurs aussi motivés que toi, 
                 montre tes projets persos et reçois des feedbacks constructifs.<br/>  
                 Rejoins la communauté de l'After Ada
                </Typography>
            </div>
          </div>
          <div className="flex items-center h-full col-span-6">
            <div className="w-full pl-12">
                <Image
                    src="/assets/svg/ballon.svg"
                    alt="illustration ballon"
                    width={511}
                    height={596}
                />

            </div>
          </div>
        </Container>
      </div>
      <OnboardingFooter
        next={next}
        isFirstStep={isFirstStep}
        isFinalStep={isFinalStep}
      />
    </div>
  );
};
