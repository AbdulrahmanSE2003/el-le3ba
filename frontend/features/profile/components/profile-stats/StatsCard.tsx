import { LucideIcon } from "lucide-react";

import { fadeInUp } from "@/components/shared/animations";

import { formatNumber } from "@/components/shared/numbers-format";
import StyleContainer from "@/components/shared/StyleContainer";

import { UserData } from "@/shared/api/helpers";

interface Props {
  title: string;
  icon: LucideIcon;
  label: keyof UserData;
  user: UserData;
}

export default function StatsCard({ title, label, icon: Icon, user }: Props) {
  const stat = (user[label] ?? 0) as number;
  const formattedNum = formatNumber(stat);

  return (
    <StyleContainer
      variants={fadeInUp}
      whileHover={{ scale: 1.03, rotate: -1 }}
      transition={{ type: "spring" }}
      className="flex justify-between items-center"
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>
        <p className="text-2xl font-black text-foreground">{formattedNum}</p>
      </div>

      <div className="w-12 h-12 rounded-xl bg-primary/15 dark:bg-primary/25 border border-primary/20 flex items-center justify-center text-primary">
        <Icon size={24} />
      </div>
    </StyleContainer>
  );
}
