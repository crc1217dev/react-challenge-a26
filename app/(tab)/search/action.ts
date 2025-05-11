"use server";

import db from "@/lib/db";
import { keywordSchema } from "@/lib/validation";

export async function searchTweet(_: unknown, formData: FormData) {
  const keyword = formData.get("keyword");
  const result = keywordSchema.safeParse(keyword);
  if (!result.success)
    return { data: null, error: result.error.flatten(), keyword };
  return { data: await getTWeetByKeyword(result.data), error: null, keyword };
}
export async function getTWeetByKeyword(keyword: string) {
  const tweets = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      },
    },
    include: {
      _count: {
        select: {
          responses: true,
          like: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
}
