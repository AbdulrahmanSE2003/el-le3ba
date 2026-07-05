import Motion from "@/components/shared/Motion";

import StatsCard from "./StatsCard";
import { stats } from "@/features/profile/stats";

import { containerVariants } from "@/components/shared/animations";

export default function ProfileStats() {
  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </Motion>
  );
}
