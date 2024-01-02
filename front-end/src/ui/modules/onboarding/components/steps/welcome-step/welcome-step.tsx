import { BaseComponentProps } from "@/types/onboarding-steps-list"
import { OnboardingFooter } from "../../footer/onboarding-footer"

export const WelcomeStep = ({next,isFirstStep,isFinalStep}:BaseComponentProps) => {
    return <div className="relative h-screen text-white ">
        Welcome step
        <OnboardingFooter
        next={next}
        isFirstStep={isFirstStep}
        isFinalStep={isFinalStep}
        />
        </div>
}