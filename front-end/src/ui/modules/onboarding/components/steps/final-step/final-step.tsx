import { useAuth } from "@/context/authUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { ProfileStepForm } from "../profile-step/profile-step-form";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Logo } from "@/ui/design-system/logo/logo";
import { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { firestoreUpdateDocument } from "@/api/firestore";
import { toast } from "react-toastify";

export const FinalStep = ({ isFinalStep }: BaseComponentProps) => {
  const { authUser, reloadAuthUserData } = useAuth();

  const { value: isLoading, toggle } = useToggle();

  //Parametre Animation confetti :
  const refAnimationInstance = useRef<((opts: any) => void) | null>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    if (refAnimationInstance.current !== null) {
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.5 },
        particleCount: Math.floor(2000 * particleRatio),
      });
    }
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 500,
      startVelocity: 60,
    });
    makeShot(0.25, {
      spread: 500,
      startVelocity: 35,
      decay: 0.92,
      scalar: 1.2,
    });
    // makeShot(0.25, {
    //     spread: 500,
    //     startVelocity: 45,
    //     decay: 0.92,
    //     scalar: 1.2
    // });
  }, [makeShot]);

  useEffect(() => {
    setTimeout(() => {
      fire();
    }, 500);
  }, []);

  const handleCloseOnboarding = async () => {
    toggle();
    const data = {
        onboardingIsCompleted: true,
    };
    const { error } = await firestoreUpdateDocument(
        "users",
        authUser.uid,
        data
    )
    if (error) {
        toggle();
        toast.error(error.message);
        return;
    }
    reloadAuthUserData()
    toggle();
};

  return (
    <>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          zIndex: 9999,
          position: "fixed",
          width: "100%",
          height: "100%",
          top: -80,
          left: -0,
        }}
      />
      <div className="relative h-screen pb-[91px]">
        <div className="h-full overflow-auto">
          <Container className=" h-full ">
            <div className="relative z-10 flex items-center h-full py-10">
              <div className="w-full max-w-xl mx-auto space-y-8 pb-4.5">
                <div className="">
                  <Typography className="text-center" variant="h5">
                    L'After
                  </Typography>
                  <div className="flex justify-center">
                    <Logo size="small" />
                  </div>
                </div>

                <Typography variant="h1" component="h1" className="text-center">
                  Félicitation !
                </Typography>
                <Typography
                  variant="body-base"
                  component="p"
                  theme="gray"
                  className="text-center"
                >
                  Tu fais maintenant partie de la tribu de l'After Ada ! Nous
                  sommes ravis de t'accueillir parmi nous. Tu vas pouvoir te
                  lancer dans l'aventure, partager tes projets les plus fous et
                  rencontrer des développeurs aussi passionnés que toi.
                </Typography>
              </div>
            </div>
          </Container>
        </div>

        <OnboardingFooter
          isFinalStep={isFinalStep}
          isLoading={isLoading}
          next={handleCloseOnboarding}
        />
      </div>
    </>
  );
};
