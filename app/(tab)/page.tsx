import AddTweet from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import ThemeToggle from "@/components/ThemeToggle";
import { getInitialTweets } from "@/service/tweetService";

export default async function MainPage() {
  const tweets = await getInitialTweets();
  return (
    <div className="p-5 flex flex-col gap-5">
      <ThemeToggle />
      <AddTweet />
      <TweetList initialTweets={tweets} />
    </div>
  );
}
