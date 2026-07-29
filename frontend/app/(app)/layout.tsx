import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import StoreInitializer from "@/store/storeInitializer";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/shared/api/helpers";

async function getProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) return null;

  const result = await getCurrentUser();

  if (!result.success) redirect("/login");
  return result.data.userData;
}
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getProfile();

  if (user && !user.avatar) {
    redirect("/select-avatar");
  }

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
