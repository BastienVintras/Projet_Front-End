import { useState } from "react"
import { OnboardingView } from "./onbording.view"

export const OnboadingContainer =()=>{
    
    const [currentStep, setCurrentStep] = useState<number>(1);

    return(
        <OnboardingView/>
    )
}