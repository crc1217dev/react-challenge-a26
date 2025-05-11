"use client";

import { ReadStream } from "node:fs";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function Button({
  text,
  ...rest
}: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
