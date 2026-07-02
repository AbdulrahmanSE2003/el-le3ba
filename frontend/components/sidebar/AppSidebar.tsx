"use client";

import { Sidebar, SidebarRail } from "@/components/ui/sidebar";

import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooterActions } from "./SidebarFooterActions";
import { SidebarNav } from "./SidebarNav";

import { userNavItems } from "./nav-config";
import SidebarWrapper from "./SidebarWrapper";

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <SidebarWrapper>
        <SidebarBrand variant="user" />

        <SidebarNav items={userNavItems} />

        <SidebarFooterActions className="mt-auto" />
      </SidebarWrapper>
    </Sidebar>
  );
}
