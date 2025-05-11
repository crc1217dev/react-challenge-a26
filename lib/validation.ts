import bcrypt from "bcrypt";
import { z } from "zod";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MIN_LENGTH,
} from "./constants";
import {
  getUserByEmail,
  getUserByUsername,
  getUserAuthInfo,
} from "@/service/userService";
import getSession from "./session";

export const responseSchema = z
  .string({
    required_error: "Response is required.",
  })
  .trim()
  .max(200, "Response should be less then 200 characters long.");
export const keywordSchema = z
  .string({
    required_error: "Search-keyword is required.",
  })
  .trim()
  .min(2, "2글자 이상 검색가능합니다.");
export const profileSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required.",
      })
      .trim()
      .email("Please enter a valid email address."),
    username: z
      .string({
        invalid_type_error: "Username must contain only letters.",
        required_error: "Username is required.",
      })
      .trim()
      .min(USERNAME_MIN_LENGTH, "Username must be at least 5 characters long."),
    password: z.string({
      required_error: "Password is required.",
    }),
    newPassword: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value ||
          (value.length >= PASSWORD_MIN_LENGTH && PASSWORD_REGEX.test(value)),
        {
          message:
            "New password must be at least 10 characters long and contain at least one number.",
        }
      ),
    bio: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || value.length <= 200, {
        message: "Bio must be 200 characters or less.",
      }),
  })
  .superRefine(async ({ email }, ctx) => {
    const isEmailAvailable = await checkEmailAvailability(email);
    if (!isEmailAvailable) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already in use.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });
export const checkEmailAvailability = async (email: string) => {
  const session = await getSession();
  const user = await getUserByEmail(email);
  if (session.id === user?.id) return Boolean(user);
  return !Boolean(user);
};
export const checkUsernameAvailability = async (username: string) => {
  const session = await getSession();
  const user = await getUserByUsername(username);
  if (session.id === user?.id) return Boolean(user);
  return !Boolean(user);
};
export const checkUserPassword = async (password: string) => {
  const user = await getUserAuthInfo();
  const isValidPassword = await bcrypt.compare(
    password,
    user!.password ?? "소셜로그인"
  );
  return isValidPassword;
};
