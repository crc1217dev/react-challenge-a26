"use client";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./action";

export default function LogIn() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 justify-center items-center">
      <div className="flex flex-col gap-2 *:font-medium"></div>
      <form action={action} className="flex flex-col gap-3 w-96">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.error?.fieldErrors.email ?? []}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.error?.fieldErrors.username ?? []}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.error?.fieldErrors.password ?? []}
        />
        <FormButton text="Log in" success={state?.success} />
      </form>
      {state?.success && (
        <span className="text-green-400 font-medium">Success</span>
      )}
    </div>
  );
}
