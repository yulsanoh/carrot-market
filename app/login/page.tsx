"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function LogIn() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일과 패스워드로 로그인하세요!</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <FormInput name="email" required type="email" placeholder="이메일" errors={[]} />
        <FormInput name="password" required type="password" placeholder="패스워드" errors={state?.errors ?? []} />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
