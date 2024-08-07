"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">회원 가입을 위해 아래의 항목을 완성해주세요!</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <Input name="username" required type="text" placeholder="계정" errors={state?.fieldErrors.username} />
        <Input name="email" required type="email" placeholder="이메일" errors={state?.fieldErrors.email} />
        <Input minLength={PASSWORD_MIN_LENGTH} name="password" required type="password" placeholder="패스워드" errors={state?.fieldErrors.password} />
        <Input minLength={PASSWORD_MIN_LENGTH} name="confirmPassword" required type="password" placeholder="패스워드 확인" errors={state?.fieldErrors.confirmPassword} />
        <Button text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
