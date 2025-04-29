import { Prisma } from "@/app/generated/prisma";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";

async function getInitialTweets() {
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

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <div>
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
