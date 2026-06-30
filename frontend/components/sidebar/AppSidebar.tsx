"use client";

import { Sidebar, SidebarRail } from "@/components/ui/sidebar";

import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooterActions } from "./SidebarFooterActions";
import { SidebarNav } from "./SidebarNav";

import { userNavItems } from "./nav-config";

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <div className="flex h-full flex-col dark:bg-muted">
        <SidebarBrand variant="user" />

        <SidebarNav items={userNavItems} />

        <SidebarFooterActions className="mt-auto" />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
