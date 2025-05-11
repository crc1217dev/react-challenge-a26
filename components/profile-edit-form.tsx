"use client";

import {
  DocumentTextIcon,
  EnvelopeIcon,
  KeyIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import { editProfile } from "@/app/(tab)/users/[username]/edit/action";
import { InitialUserInformationType } from "@/service/userService";
import Input from "./input";
import Button from "./button";
import { useActionState } from "react";

export default function ProfileEditForm({
  initialUserInformation,
}: {
  initialUserInformation: InitialUserInformationType;
}) {
  const [state, action] = useActionState(editProfile, null);

  return (
    <form action={action} className="w-full flex flex-col gap-5">
      <Input
        labelIcon={<UserIcon className="size-6 text-rose-500" />}
        type="text"
        required
        placeholder="이름을 입력해주세요."
        name="username"
        defaultValue={initialUserInformation.username}
        errors={state?.error?.fieldErrors?.username}
      />
      <Input
        labelIcon={<EnvelopeIcon className="size-6 text-rose-500" />}
        type="email"
        required
        placeholder="이메일을 입력해주세요."
        name="email"
        defaultValue={initialUserInformation.email ?? ""}
        errors={state?.error?.fieldErrors?.email}
      />
      <Input
        labelIcon={<KeyIcon className="size-6 text-rose-500" />}
        type="password"
        required
        placeholder="현재 비밀번호를 입력해주세요."
        name="password"
        errors={state?.error?.fieldErrors.password}
      />
      <Input
        labelIcon={<LockClosedIcon className="size-6 text-stone-500" />}
        type="password"
        required={false}
        placeholder="변경할 비밀번호를 입력해주세요."
        name="newPassword"
        errors={state?.error?.fieldErrors?.newPassword}
      />
      <Input
        labelIcon={<DocumentTextIcon className="size-6 text-stone-500" />}
        type="text"
        required={false}
        placeholder="자기소개를 입력해주세요."
        name="bio"
        defaultValue={initialUserInformation.bio ?? ""}
        errors={state?.error?.fieldErrors.bio}
      />
      <Button text="수정 하기" />
    </form>
  );
}
