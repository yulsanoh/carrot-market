"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { smsLogIn } from "./actions";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogIn() {
  const [state, dispatch] = useFormState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">휴대폰 번호를 입력하세요</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        {state.token ? (
          <Input key="token" name="token" required type="number" placeholder="인증번호" min={100000} max={999999} />
        ) : (
          <Input key="phone" name="phone" required type="text" placeholder="휴대폰 번호" errors={state.error?.formErrors} />
        )}
        <Button text={state.token ? "인증하기" : "인증문자 발송"} />
      </form>
    </div>
  );
}
