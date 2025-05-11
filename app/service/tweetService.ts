import { Prisma } from "@/app/generated/prisma";
("use server");

import { z } from "zod";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import getSession from "@/lib/session";

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
    console.log(tweet);
    redirect(`/tweets/${tweet.id}`);
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
  console.log(tweet);
  return tweet;
}
