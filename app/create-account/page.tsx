import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">회원 가입을 위해 아래의 항목을 완성해주세요!</h2>
      </div>
      <form className="flex flex-col gap-3" action="">
        <FormInput required type="text" placeholder="계정" errors={[]} />
        <FormInput required type="email" placeholder="이메일" errors={[]} />
        <FormInput required type="password" placeholder="패스워드" errors={[]} />
        <FormInput required type="password" placeholder="패스워드 확인" errors={[]} />
        <FormButton text="회원가입" loading={false} />
      </form>
      <SocialLogin />
    </div>
  );
}
