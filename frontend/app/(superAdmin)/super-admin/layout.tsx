import { SuperAdminSidebar } from "@/components/sidebar/SuperAdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SuperAdminHeader } from "@/features/super-admin/components/superAdminHeader";
import { getCurrentUser } from "@/shared/api/helpers";
import StoreInitializer from "@/store/storeInitializer";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const superAdminLayout = async ({ children }: { children: ReactNode }) => {
  const userRes = await getCurrentUser();

  if (!userRes.success) {
    redirect("/login");
  }
  const user = userRes.data.userData;
  return (
    <SidebarProvider>
      <SuperAdminSidebar />

      <SidebarInset>
        <StoreInitializer user={user} />

        <SuperAdminHeader name={user.name} />
        <section className="flex-1 overflow-auto p-4 md:p-6 h-screen">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default superAdminLayout;
