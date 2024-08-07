"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function LogIn() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일과 패스워드로 로그인하세요!</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <Input name="email" required type="email" placeholder="이메일" errors={state?.fieldErrors.email} />
        <Input minLength={PASSWORD_MIN_LENGTH} name="password" required type="password" placeholder="패스워드" errors={state?.fieldErrors.password} />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
