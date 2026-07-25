import StyleContainer from "@/components/shared/StyleContainer";

import { fadeInUp } from "@/components/shared/animations";

import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  value: string | number;
}

export default function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
}: Props) {
  return (
    <StyleContainer
      variants={fadeInUp}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring" }}
      className="flex justify-between items-center p-5 rounded-2xl border border-border shadow-sm bg-white dark:bg-card"
    >
      {/* Text */}
      <div className="flex flex-col gap-1.5 text-right">
        {/* title */}
        <span className="text-xs font-semibold text-muted-foreground">
          {title}
        </span>
        {/* value */}
        <p className="text-xl md:text-2xl font-black text-foreground">
          {value}
        </p>
      </div>

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} border border-current/10`}
      >
        <Icon size={20} />
      </div>
    </StyleContainer>
  );
}
