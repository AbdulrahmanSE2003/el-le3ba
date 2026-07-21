import { achievements } from "../../achievements";
import StyleContainer from "../../../../components/shared/StyleContainer";
import AchievementCard from "./AchievementCard";

import { Zap } from "lucide-react";

import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";

export default function Achievements() {
  return (
    <StyleContainer header="الإنجازات" icon={Zap} iconColor="text-yellow-500">
      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      >
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.title} {...achievement} />
        ))}
      </Motion>
    </StyleContainer>
  );
}
