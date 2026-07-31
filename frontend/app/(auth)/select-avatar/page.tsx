import { fetchUserData } from "@/features/profile/api";

import SelectAvatarContainer from "@/features/select-avatar/components/SelectAvatarContainer";

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SelectAvatarPage() {
  const { userData } = await fetchUserData();
  const avatar = userData.avatar;

  if (avatar) {
    redirect("/dashboard");
  }

  return <SelectAvatarContainer />;
}
