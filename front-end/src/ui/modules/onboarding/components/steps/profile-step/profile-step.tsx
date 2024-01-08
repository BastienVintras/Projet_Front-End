import { Typography } from "@/ui/design-system/typography/typography"
import { OnboardingFooter } from "../../footer/onboarding-footer"
import { BaseComponentProps } from "@/types/onboarding-steps-list"
import { OnboardingTabs } from "../../tabs/onboarding-tabs"
import { Container } from "@/ui/components/container/container"
import { ProfileStepForm } from "./profile-step-form"
import { SubmitHandler, useForm } from "react-hook-form"
import { OnboardingProfileFormFieldsType } from "@/types/forms"
import { useToggle } from "@/hooks/use-toggle"
import { firestoreUpdateDocument } from "@/api/firestore"
import { useAuth } from "@/context/authUserContext"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { updateUserIdenticationData } from "@/api/authentication"

export const ProfileStep = ({
next,
isFirstStep,
isFinalStep,
getCurrentStep,
prev,
stepList,
}:BaseComponentProps) => {
    const {authUser} = useAuth();
    

const{value :isLoading, setValue :setLoading} = useToggle();
const {
    handleSubmit,
    control,
    formState: {errors},
    register,
    reset,
    setValue,
} = useForm<OnboardingProfileFormFieldsType>();

const {displayName, expertise, biography} = authUser.userDocument;

useEffect(()=>{
    const fieldsToUpdate: ("displayName"|"expertise"|"biography")[]=[
        "displayName",
        "expertise",
        "biography"
    ];
    for(const field of fieldsToUpdate){
        setValue(field, authUser.userDocument[field]);
    }
},[]);

const handleUpdateUserDocument = async(
    formData: OnboardingProfileFormFieldsType
) => {
    
    const{error} = await firestoreUpdateDocument(
        "users",
        authUser.uid,
        formData
    );
    if (error){
        setLoading(false);
        toast.error(error.message);
        return;
    }
    setLoading(false);
    reset();
    next();
}

const onSubmit: SubmitHandler<OnboardingProfileFormFieldsType> = async(
    formData
    ) =>{
    setLoading(true);

        if (
            displayName != formData.displayName ||
            expertise != formData.expertise ||
            biography != formData.biography
        ){
            if(
                displayName != formData.displayName ||
                authUser.displayName !== formData.displayName
                ){
                    const data = {
                        displayName: formData.displayName
                    }

                    const {error} = await updateUserIdenticationData(
                        authUser.uid,
                        data
                    );

                    if (error){
                        setLoading(false);
                        toast.error(error.message);
                        return;
                    }
                    
                }

            handleUpdateUserDocument(formData);
        }
        setLoading(false);
        next();
}

    return (
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
                    Présente toi ! 
                </Typography>
                <Typography variant="body-base" component="p" theme="gray">
                Dis-nous tout sur toi ! Remplis notre formulaire de présentation pour qu'on puisse mieux te connaître. 
                On veut savoir qui tu es et ce que tu fais. 
                Plus on en saura sur toi, mieux on pourra personnaliser ton expérience sur notre plateforme.
                </Typography>
            </div>
          </div>
          <div className="flex items-center h-full col-span-6">
            <div className="flex justify-end w-full">
                <ProfileStepForm
                form={{
                    errors,
                    control,
                    register,
                    handleSubmit,
                    onSubmit,
                    isLoading
                }}
                />
            </div>

            
          </div>
        </Container>
      </div>


        <OnboardingFooter
        prev={prev}
        next={handleSubmit(onSubmit)}
        isFirstStep={isFirstStep}
        isFinalStep={isFinalStep}
        isLoading={isLoading}
      />
    </div>)
}