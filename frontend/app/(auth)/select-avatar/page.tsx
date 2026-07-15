import { fetchUserData } from "@/features/profile/api";

import SelectAvatarContainer from "@/features/select-avatar/components/SelectAvatarContainer";

import { redirect } from "next/navigation";

export default async function SelectAvatarPage() {
  const { userData } = await fetchUserData();
  const avatar = userData.avatar;

  if (avatar) {
    redirect("/dashboard");
  }

  return <SelectAvatarContainer />;
}
