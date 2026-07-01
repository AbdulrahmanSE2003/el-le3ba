// app/(app)/MatchLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface MatchLayoutProps {
  children: ReactNode;
  storeInitializer: ReactNode;
}

export default function MatchLayout({
  children,
  storeInitializer,
}: MatchLayoutProps) {
  const pathname = usePathname();
  const isMatchRoute = /^\/match\/(?:result\/)?[^/]+$/.test(pathname);

  if (isMatchRoute) {
    return (
      <>
        {storeInitializer}
        {children}
      </>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {storeInitializer}
        <section className="flex-1 overflow-auto">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
