import { Moon, Sun } from "lucide-react";
import ModeBtn from "./ModeBtn";

interface Props {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export default function SettingCard({ theme, setTheme }: Props) {
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>مظهر التطبيق</span>
        <span>{isDark ? "الوضع الحالي: الليلي" : "الوضع الحالي: النهاري"}</span>
      </div>

      {/* Switcher */}
      <div className="relative w-full bg-secondary dark:bg-secondary/40 p-1 rounded-2xl flex items-center gap-1 border border-border/50">
        <ModeBtn
          title="الوضع النهاري"
          icon={Sun}
          isActive={!isDark}
          onClick={() => setTheme("light")}
          layoutId="activeTheme"
        />

        <ModeBtn
          title="الوضع الليلي"
          icon={Moon}
          isActive={isDark}
          onClick={() => setTheme("dark")}
          layoutId="activeTheme"
        />
      </div>
    </div>
  );
}
