"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "전화번호를 정확하게 입력해주세요.");
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface IActionState {
  token: boolean;
}

export async function smsLogIn(prevState: IActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      // log the user in
      redirect("/");
    }
  }
}
