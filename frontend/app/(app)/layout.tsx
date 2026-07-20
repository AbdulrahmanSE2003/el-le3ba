import { ReactNode } from "react";

import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import StoreInitializer from "@/store/storeInitializer";
import { cookies } from "next/headers";
import { serverFetch } from "@/shared/api/server";

interface UserAPIResponse {
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

  const result = await serverFetch<UserAPIResponse>("users/me");
  if (!result.success) return null;
  return result.data.user;
}
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getProfile();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger className="text-primary fixed z-50 top-5 hover:text-primary/80 duration-300 cursor-pointer" />{" "}
      </div>
      <SidebarInset>
        <StoreInitializer user={user} />
        <section className="flex-1 overflow-auto h-screen">
          <div className={`container mx-auto w-full py-4 md:w-3/5`}>
            {children}
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
