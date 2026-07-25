import { ReactNode } from "react";

import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/shared/api/helpers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userRes = await getCurrentUser();

  if (!userRes.success) {
    redirect("/login");
  }

  if (userRes.data.userData.role !== "admin") {
    redirect("/dashboard");
  }
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-12.25 shrink-0 items-center gap-3 border-b border-border px-4">
          <SidebarTrigger className="text-destructive hover:text-destructive/80 transition-colors" />
          <span className="font-display text-sm text-muted-foreground">
            لوحة المشرف
          </span>
        </header>
        <section className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
