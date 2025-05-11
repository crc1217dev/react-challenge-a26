import { notFound } from "next/navigation";
import { getUserInfoBySession } from "@/service/userService";
import ProfileEditForm from "@/components/profile-edit-form";

export default async function ProfileEditPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserInfoBySession();
  if (user.username !== params.username) {
    notFound();
  }
  return (
    <main className="flex flex-col pt-10 pb-40 h-screen px-3 ">
      <ProfileEditForm initialUserInformation={user} />
    </main>
  );
}
