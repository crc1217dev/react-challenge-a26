"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { Prisma } from "@/app/generated/prisma";
import { getSession } from "@/lib/session";
import db from "@/lib/db";

const LIMIT_NUMBER = 2;
export const getInitialTweets = async () => {
  const tweets = db.tweet.findMany({
    include: { user: true },
    take: LIMIT_NUMBER,
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
};
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export async function getTweetsByPage(page: number) {
  const tweets = await db.tweet.findMany({
    include: { user: true },
    skip: LIMIT_NUMBER * (page - 1),
    take: LIMIT_NUMBER,
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
}
export async function getTweetTotalCount() {
  return db.tweet.count();
}
export async function getPaginatedTweets(page: number) {
  const tweets = await getTweetsByPage(page);
  const TWEETS_TOTAL_COUNT = await getTweetTotalCount();
  const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_NUMBER * page;
  return { tweets, isLastPage };
}

const tweetSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required.",
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
  if (!session.id) {
    return {
      error: "로그인이 필요합니다.",
      isSuccess: false,
    };
  }

  try {
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
  } catch (error) {
    return {
      error: "트윗 업로드 중 오류가 발생했습니다.",
      isSuccess: false,
    };
  }
}

export async function getTweetDetail(tweetId: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          responses: true,
        },
      },
    },
  });
  return tweet;
}
