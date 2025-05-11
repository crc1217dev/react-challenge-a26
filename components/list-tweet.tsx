import { User } from "@/app/generated/prisma";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

export default function ListTweet({
  tweet,
  createdAt,
  id,
  user,
}: {
  tweet: string;
  createdAt: Date;
  id: number;
  user: User;
}) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="flex flex-col p-10 rounded-2xl *:text-stone-700 hover:bg-stone-200"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{user.username}</span>
        <span className="text-sm text-stone-400">
          {formatToTimeAgo(createdAt.toString())}
        </span>
      </div>
      <p className="text-lg">{tweet}</p>
    </Link>
  );
}
