import { FormsType } from "@/types/forms";
import { Button } from "@/ui/design-system/button/button";
import { Input } from "@/ui/design-system/forms/input";


interface Props {
  form: FormsType;
}
export const RegisterForm = ({ form }: Props) => {
  const {onSubmit, errors, isLoading, register, handleSubmit } = form;

  console.log("form", form);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
      <Input
      isLoading = {isLoading}
    placeholder= "alumiada@gmail.com"
    type = "email"
    register={register}
    errors = {errors}
    errorMsg ="Tu dois renseigner ce champs"
    id="email"
      />
        <Input
      isLoading = {isLoading}
    placeholder= "Mot de passe"
    type = "password"
    register={register}
    errors = {errors}
    errorMsg ="Tu dois renseigner ce champs"
    id="password"
      />
       <Input
      isLoading = {isLoading}
    placeholder= "Quelle est ta promo ?"
    register={register}
    errors = {errors}
    errorMsg ="Tu dois renseigner ce champs"
    id="what_is_your_prom"
      />
      <Button isLoading={isLoading} type="submit" fullWith>S'inscrire</Button>
    </form>
  );
};
