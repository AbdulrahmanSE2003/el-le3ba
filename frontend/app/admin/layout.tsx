import { ReactNode } from "react";

import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
          <SidebarTrigger className="text-destructive hover:text-destructive/80 transition-colors" />
          <span className="font-display text-sm text-muted-foreground">
            لوحة المشرف
          </span>
        </header>
        <section className="flex-1 overflow-auto p-4 md:p-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
