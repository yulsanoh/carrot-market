"use server";
import { PASSWORD_LENGTH_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

// const checkUsername = (username: string) => {
//   return !username.includes("potato");
// };

// const checkUniqueUsername = async (username: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       id: true,
//     },
//   });

//   // if (user) {
//   //   return false;
//   // } else {
//   //   return true;
//   // }
//   return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//     },
//   });

//   return !Boolean(user);
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

    password: z.string({
      invalid_type_error: "패스워드는 텍스트여야 합니다.",
      required_error: "패스워드 항목은 필수로 입력해야 합니다.",
    }),
    // .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR)
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string({
      invalid_type_error: "패스워드는 텍스트여야 합니다.",
      required_error: "패스워드 항목은 필수로 입력해야 합니다.",
    }),
    // .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "계정이 이미 존재합니다.",
        fatal: true,
        path: ["username"],
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이메일이 이미 존재합니다.",
        fatal: true,
        path: ["email"],
      });
      return z.NEVER;
    }
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

  const result = await formSchema.safeParseAsync(data);
  // console.log(result);

  if (!result.success) {
    return result.error?.flatten();
  } else {
    // 패스워드 해싱
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // 유저 저장
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;

    await session.save();
    redirect("/profile");
  }
}
