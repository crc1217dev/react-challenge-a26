// "use client";

import Button from "../components/button";
import getSession from "../lib/session";
import db from "../lib/db";
import { redirect } from "next/navigation";
import TweetList from "@/components/tweet-list";
import { getInitialTweets } from "./(tabs)/tweets/actions";
import AddTweet from "@/components/add-tweet";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    return await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
  } else {
    return redirect("/login");
  }
}

export default async function Home() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();

    redirect("/login");
  };
  const tweets = await getInitialTweets();
  return (
    <div className="flex flex-col items-center min-h-screen pt-10">
      <>
        <div className="flex items-center justify-end w-full">
          <h2 className="text-lg">{user?.username}</h2>
          <form action={logout} className="w-1/6 h-1/4 ml-5 ">
            <Button text="Log Out"></Button>
          </form>
        </div>
        <AddTweet />
        <TweetList initialTweets={tweets} />
      </>
    </div>
  );
}
