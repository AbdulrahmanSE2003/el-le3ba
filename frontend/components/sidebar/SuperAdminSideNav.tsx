"use client";

import { usePathname } from "next/navigation";

import { useSidebar } from "@/components/ui/sidebar";

import type { NavItem } from "./types";

import SidebarNavBtn from "./SidebarNavBtn";

import Motion from "../shared/Motion";

interface SidebarNavProps {
  items: NavItem[];
}

export function SuperAdminSidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Motion
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      initial="hidden"
      animate="visible"
      className={`p-5 list-none flex flex-col ${isCollapsed ? "items-center" : "items-stretch"}`}
    >
      {items.map((item, index) => {
        const isActive =
          item.href === "/super-admin"
            ? pathname === "/super-admin"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Motion
            key={item.href}
            as="div"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: {} },
            }}
          >
            <SidebarNavBtn
              key={item.href}
              href={item.href}
              title={item.title}
              tooltip={item.title}
              icon={<item.icon className="duration-300" />}
              isActive={isActive}
              delay={0.1 + index * 0.05}
            />
          </Motion>
        );
      })}
    </Motion>
  );
}
