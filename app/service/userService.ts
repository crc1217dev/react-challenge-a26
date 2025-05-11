"use server";

import { notFound } from "next/navigation";

import { Prisma } from "@prisma/client";
import { getSession } from "@/lib/session";
import db from "@/lib/db";

export const getUserInfoBySession = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

export async function getUserInfoByName(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      tweets: {
        include: {
          user: true,
        },
      },
    },
  });
  if (user) {
    return user;
  }

  notFound();
}

export type InitialUserInformationType = Prisma.PromiseReturnType<
  typeof getUserInfoBySession
>;

export const isEmailExist = async (email: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

export const isUsernameExist = async (username: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return Boolean(user);
};

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return user;
};
export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return user;
};
export const getUserAuthInfo = async () => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      password: true,
    },
  });
  return user;
};
