"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooterActions } from "./SidebarFooterActions";
import { SidebarNav } from "./SidebarNav";
import SidebarWrapper from "./SidebarWrapper";

import { userNavItems } from "./nav-config";

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <SidebarWrapper>
        <SidebarBrand variant="user" />

        <SidebarContent className="min-h-0 flex-1 overflow-hidden">
          <SidebarNav items={userNavItems} />
        </SidebarContent>

        <SidebarFooterActions className="mt-auto" />
      </SidebarWrapper>
    </Sidebar>
  );
}
