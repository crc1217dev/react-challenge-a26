import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
  success?: boolean;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-full  h-10 bg-gray-300 text-white  font-medium  rounded-md text-center transition-colors disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed hover:bg-gray-200`}
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
