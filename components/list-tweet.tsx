import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  tweet: string;
  createdAt: Date;
  id: number;
}

export default function ListProduct({
  tweet,
  createdAt,
  id,
}: ListProductProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(createdAt.toString())}
        </span>
      </div>
    </Link>
  );
}
