import { ReactNode } from "react";

import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
          <SidebarTrigger className="text-primary hover:text-primary/80 transition-colors" />
          <div className="h-1 flex-1 max-w-32 rounded-full bg-muted overflow-hidden">
            <div className="sidebar-xp-bar h-full w-2/3 rounded-full bg-primary" />
          </div>
        </header>
        <section className="flex-1 overflow-auto p-4 md:p-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
