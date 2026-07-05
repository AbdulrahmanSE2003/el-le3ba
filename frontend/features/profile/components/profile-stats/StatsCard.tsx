import { LucideIcon } from "lucide-react";

import { fadeInUp } from "@/components/shared/animations";

import { formatNumber } from "@/components/shared/numbers-format";

import StyleContainer from "../StyleContainer";

interface Props {
  title: string;
  number: string;
  icon: LucideIcon;
}

export default function StatsCard({ title, number, icon: Icon }: Props) {
  const formattedNum = formatNumber(number);

  return (
    <StyleContainer
      variants={fadeInUp}
      whileHover={{ scale: 1.03, rotate: -1 }}
      transition={{ type: "spring" }}
      className="flex justify-between items-center cursor-pointer"
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
