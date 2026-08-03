import { ReactNode } from "react";

import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/shared/api/helpers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userRes = await getCurrentUser();

  if (!userRes.success) {
    redirect("/login");
  }

  const { role } = userRes.data.userData;

  if (role === "superAdmin") {
    redirect("/super-admin");
  }

  if (role !== "admin") {
    redirect("/dashboard");
  }
  const user = userRes.data.userData;
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-12.25 shrink-0 items-center gap-3 border-b border-border px-4">
          <SidebarTrigger className="text-destructive hover:text-destructive/80 transition-colors" />
          <span className="font-display text-sm text-foreground">
            لوحة المشرف
          </span>
          <div className={`mr-auto flex items-center gap-3`}>
            <span className={`text-xs `}> الملف الشخصي</span>{" "}
            <Avatar asChild className={` group hover:border-border`}>
              <Link href={"/admin/profile"} className={`cursor-pointer`}>
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback
                  className={`text-muted-foreground group-hover:text-foreground transition-colors duration-300`}
                >
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Link>
            </Avatar>
          </div>
        </header>
        <section className="flex-1 overflow-auto p-4">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
