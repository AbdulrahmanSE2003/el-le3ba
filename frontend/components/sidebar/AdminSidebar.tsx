"use client";

import { Sidebar, SidebarRail } from "@/components/ui/sidebar";

import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooterActions } from "./SidebarFooterActions";
import { SidebarNav } from "./SidebarNav";
import { adminNavItems } from "./nav-config";
import SidebarWrapper from "./SidebarWrapper";

export function AdminSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <SidebarWrapper>
        <SidebarBrand variant="admin" />

        <SidebarNav items={adminNavItems} />

        <SidebarFooterActions className="mt-auto" />
      </SidebarWrapper>
    </Sidebar>
  );
}
