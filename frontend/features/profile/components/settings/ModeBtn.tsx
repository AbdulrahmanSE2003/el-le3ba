import Motion from "@/components/shared/Motion";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ModeBtnProps {
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  layoutId: string;
}

export default function ModeBtn(mode: ModeBtnProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return (
    <Motion
      as="button"
      onClick={mode.onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold duration-200 cursor-pointer ${
        mode.isActive
          ? "text-primary font-bold"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {/* Content */}
      <div className="flex items-center gap-2">
        <mode.icon size={18} />
        <span>{mode.title}</span>
      </div>

      {/* Switcher Background */}
      {mounted && mode.isActive && (
        <motion.div
          layoutId={mode.layoutId}
          className="absolute inset-0 bg-white dark:bg-card border border-border/40 rounded-xl shadow-sm -z-10"
          transition={{ type: "spring", stiffness: 700, damping: 25 }}
        />
      )}
    </Motion>
  );
}
