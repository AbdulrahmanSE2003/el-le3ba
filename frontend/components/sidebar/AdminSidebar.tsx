"use client";

import { Sidebar, SidebarRail } from "@/components/ui/sidebar";

import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooterActions } from "./SidebarFooterActions";
import { SidebarNav } from "./SidebarNav";
import { adminNavItems } from "./nav-config";

export function AdminSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <div className="flex h-full flex-col dark:bg-muted">
        <SidebarBrand variant="admin" />

        <SidebarNav items={adminNavItems} />

        <SidebarFooterActions className="mt-auto" />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
