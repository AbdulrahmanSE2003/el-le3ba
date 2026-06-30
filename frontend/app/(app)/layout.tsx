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
        <header className="border-b border-border p-4">
          <SidebarTrigger className="text-primary hover:text-primary/80 duration-300 cursor-pointer" />
        </header>
        <section className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
