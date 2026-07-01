import { ReactNode } from "react";
import MatchLayout from "./MatchLayout";
import StoreInitializer from "@/store/storeInitializer";
import { cookies } from "next/headers";
import { apiServer } from "@/lib/apiServer";

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
    return res.data.user;
  } catch {
    return null;
  }
}

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getProfile();

  return (
    <MatchLayout storeInitializer={<StoreInitializer user={user} />}>
      {children}
    </MatchLayout>
  );
}
