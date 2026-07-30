import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimeFrameSelector from "./TimeFrameSelector";
import AdminProfile from "./AdminProfile";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SuperAdminHeader({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-12.25 w-full items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md">
      {/* Right Side: Title & Badge (RTL) */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-destructive hover:text-destructive/80 transition-colors" />

        <div>
          <h1 className="text-base font-semibold leading-none text-foreground">
            المشرف الرئيسي{" "}
          </h1>
        </div>
      </div>

      {/* Left Side: Timeframe Selector & Actions */}
      <div className="flex items-center gap-3">
        {/* Timeframe Filter Dropdown */}
        <TimeFrameSelector />

        {/* Notifications Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
        </Button>

        {/* Admin Profile Dropdown */}
        <AdminProfile name={name} />
      </div>
    </header>
  );
}
