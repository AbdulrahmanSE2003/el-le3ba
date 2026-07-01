import { ReactNode } from "react";

import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
    const { user } = res.data;
    return user;
  } catch {
    return null;
  }
}
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getProfile();
  return (
    // NOTE: Need AuthProvider to wrap the entire app with AuthProvider to provide authentication context
    // NOTE: DON'T DELETE AuthProvider
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <StoreInitializer user={user} />
        <section className="flex-1 overflow-auto">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
