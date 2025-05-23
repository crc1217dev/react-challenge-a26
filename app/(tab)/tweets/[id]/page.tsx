import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

import { getTweetDetail } from "@/service/tweetService";
import { getLikeStatus } from "@/service/likeService";
import { getInitialResponse } from "@/service/responseService";

import Responses from "@/components/responses";
import LikeButton from "@/components/like-button";
import { getSession } from "@/lib/session";

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const cachedLikeStatus = unstable_cache(
    getLikeStatus,
    ["tweet-like-status"],
    {
      tags: [`like-status-${tweetId}`],
    }
  );
  return cachedLikeStatus(tweetId, session.id!);
}
async function getCachedResponses(tweetId: number) {
  const cachedComments = unstable_cache(
    getInitialResponse,
    ["tweet-responses"],
    {
      tags: [`tweet-responses-${tweetId}`],
    }
  );
  return cachedComments(tweetId);
}

export default async function TweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return notFound();

  const tweet = await getTweetDetail(id);
  const responses = await getCachedResponses(id);
  if (!tweet) return notFound();
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className="pb-36 w-full">
      <h3 className="p-5 flex items-center gap-3 border-b border-neutral-500">
        {tweet.user.username}
      </h3>
      <p className="p-5 min-h-56">{tweet.tweet}</p>
      <div className="w-full flex flex-col gap-5">
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
        <Responses
          initialResponses={responses}
          tweetId={id}
          username={tweet.user.username}
        />
      </div>
    </div>
  );
}
