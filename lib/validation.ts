"use server";
import bcrypt from "bcrypt";
import {
  getUserByEmail,
  getUserByUsername,
  getUserAuthInfo,
} from "@/service/userService";
import { getSession } from "./session";

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
