"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";
import getSession from "@/lib/session";
import { responseSchema } from "@/lib/validation";
import { Prisma } from "@/app/generated/prisma";

export const getInitialResponse = async (tweetId: number) => {
  const responses = await db.response.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      tweet: true,
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
          response: result.data,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
  revalidateTag(`tweet-responses-${tweetId}`);
};
