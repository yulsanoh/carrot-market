"use server";
import { PASSWORD_LENGTH_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";

// const checkUsername = (username: string) => {
//   return !username.includes("potato");
// };

const checkPassword = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
  return password === confirmPassword;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "계정은 텍스트여야 합니다.",
        required_error: "계정 항목은 필수로 입력해야 합니다.",
      })
      .toLowerCase()
      .trim(),

    email: z
      .string({
        invalid_type_error: "이메일은 텍스트여야 합니다.",
        required_error: "이메일 항목은 필수로 입력해야 합니다.",
      })
      .email()
      .toLowerCase(),
    password: z
      .string({
        invalid_type_error: "패스워드는 텍스트여야 합니다.",
        required_error: "패스워드 항목은 필수로 입력해야 합니다.",
      })
      .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string({
        invalid_type_error: "패스워드는 텍스트여야 합니다.",
        required_error: "패스워드 항목은 필수로 입력해야 합니다.",
      })
      .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR),
  })
  .refine(checkPassword, {
    message: "비밀번호는 동일해야 합니다.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    return result.error?.flatten();
  } else {
    console.log(result.data);
  }
}
