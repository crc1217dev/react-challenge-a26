"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      createdAt: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
}
export async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      createdAt: true,
      id: true,
    },
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
}

const tweetSchema = z.object({
  tweet: z.string({
    required_error: "트윗을 입력해주세요.",
  }),
});

export async function uploadTweet(_: unknown, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }
  const session = await getSession();
  if (session.id) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }
}
