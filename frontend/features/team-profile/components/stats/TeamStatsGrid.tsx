import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";
import Stats from "./Stats";

export default function TeamStatsGrid() {
  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-2 gap-4"
    >
      <Stats />
    </Motion>
  );
}
