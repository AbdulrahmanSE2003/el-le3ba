import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import Motion from "../shared/Motion";

import { fadeInUp } from "../shared/animations";
import { ReactNode } from "react";
import Icon from "./Icon";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  title: string;
  tooltip: string;
  onclick?: () => void;
  icon: ReactNode;
}

export default function SidebarFooterBtn({
  title,
  icon,
  tooltip,
  onclick,
  className,
}: Props) {
  return (
    <SidebarMenuItem>
      <Motion
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        delay={0.4}
        type="spring"
      >
        <SidebarMenuButton
          tooltip={tooltip}
          onClick={onclick || undefined}
          className={`transition-all hover:scale-105 cursor-pointer py-6 duration-300 ${className}`}
        >
          <Icon icon={icon} />

          <span>{title}</span>
        </SidebarMenuButton>
      </Motion>
    </SidebarMenuItem>
  );
}
