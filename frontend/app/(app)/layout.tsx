import { ReactNode } from "react";

import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import StoreInitializer from "@/store/storeInitializer";
import { cookies } from "next/headers";

async function getProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) return null;

  try {
    // جلب بيانات المستخدم الحالي باستخدام التوكن
    const res = await fetch("http://127.0.0.1:5000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
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
