"use server";

import { Prisma } from "@/app/generated/prisma";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { responseSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";

export const getInitialResponse = async (tweetId: number) => {
  const responses = await db.response.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return responses;
};
export type InitialResponses = Prisma.PromiseReturnType<
  typeof getInitialResponse
>;

export const addTweetResponse = async (formData: FormData) => {
  const text = formData.get("text");
  const tweetId = formData.get("tweetId");
  const result = responseSchema.safeParse(text);
  if (!result.success) {
    return { error: result.error.flatten(), isSuccess: false };
  }
  const session = await getSession();
  try {
    if (session.id) {
      await db.response.create({
        data: {
          userId: session.id,
          tweetId: Number(tweetId),
          text: result.data,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
  revalidateTag(`tweet-responses-${tweetId}`);
};
