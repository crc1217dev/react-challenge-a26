import { uploadTweet } from "@/app/(tabs)/tweets/actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <form className="flex flex-col gap-2 w-full p-5" action={action}>
      <textarea
        name="tweet"
        className="w-full h-32 border-2 border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:border-orange-500"
        placeholder="무슨 일이 있었나요?"
      ></textarea>
      <button type="submit" className="primary-btn text-lg py-2.5 w-full">
        트윗하기
      </button>
    </form>
  );
}
