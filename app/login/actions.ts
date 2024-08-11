"use server";
import { PASSWORD_LENGTH_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcyrpt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkEmailExists, "계정이 존재하지 않습니다."),
  password: z.string({
    required_error: "패스워드 항목은 필수로 입력해야 합니다.",
  }),
  // .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcyrpt.compare(result.data.password, user!.password ?? "xxx");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 패스워드입니다."],
          email: [],
        },
      };
    }
  }
};
