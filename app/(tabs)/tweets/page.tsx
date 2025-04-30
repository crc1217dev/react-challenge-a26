import { Prisma } from "@/app/generated/prisma";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { getInitialTweets } from "./actions";

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <div>
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
