import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SidebarWrapper({ children }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white dark:bg-card">
      {children}
    </div>
  );
}
