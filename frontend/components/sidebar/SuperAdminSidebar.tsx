"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooterActions } from "./SidebarFooterActions";
import { SidebarNav } from "./SidebarNav";
import SidebarWrapper from "./SidebarWrapper";
import { superAdminNav } from "@/features/admin/utils/constants";

export function SuperAdminSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <SidebarWrapper>
        <SidebarBrand variant="admin" />

        <SidebarContent className="min-h-0 flex-1 overflow-hidden">
          <SidebarNav items={superAdminNav} />
        </SidebarContent>

        <SidebarFooterActions className="mt-auto" />
      </SidebarWrapper>
    </Sidebar>
  );
}
