import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiServer } from "@/lib/apiServer";
import SelectAvatarClient from "./SelectAvatarClient";

interface UserAPIResponse {
  status: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "student" | "admin";
    avatar: string | null;
    totalScore: number;
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    bestStreak: number;
    createdAt: string;
    updatedAt: string;
  };
}

async function getProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) return null;

  try {
    const res = await apiServer<UserAPIResponse>("get", "/users/me");
    if (!res.status) return null;
    const { user } = res.data;
    return user;
  } catch {
    return null;
  }
}

export default async function SelectAvatarPage() {
  const user = await getProfile();

  if (!user) {
    redirect("/login");
  }

  if (user.avatar) {
    redirect("/dashboard");
  }

  return <SelectAvatarClient user={user} />;
}
