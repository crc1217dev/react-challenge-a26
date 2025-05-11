"use client";

import Button from "./button";
import { uploadTweet } from "@/service/tweetService";

import { useActionState } from "react";
export default function AddTweet() {
  const [state, action] = useActionState(uploadTweet, null);
  return (
    <form action={action} className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <textarea
          name="tweet"
          required
          placeholder="How was today?"
          className="w-full p-5 rounded-md resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        {!state?.isSuccess && (
          <span className="text-red-500 dark:text-red-400">
            {state?.error.fieldErrors.tweet}
          </span>
        )}
      </div>
      <Button text="Add tweet" />
    </form>
  );
}
