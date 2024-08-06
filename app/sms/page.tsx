import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function SMSLogIn() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">휴대폰 번호를 입력하세요</h2>
      </div>
      <form className="flex flex-col gap-3" action="">
        <FormInput required type="number" placeholder="휴대폰 번호" errors={[]} />
        <FormInput required type="number" placeholder="인증번호" errors={[]} />
        <FormButton text="인증번호 확인" loading={false} />
      </form>
    </div>
  );
}
