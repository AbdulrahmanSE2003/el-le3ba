import { fadeInLeft } from "@/components/shared/animations";
import Motion from "@/components/shared/Motion";

interface Props {
  title: string;
  label: string;
  icon: string;
}

export default function AchievementCard(achievement: Props) {
  return (
    <Motion
      as="div"
      variants={fadeInLeft}
      whileHover={{ rotate: 2 }}
      transition={{ duration: 0.3 }}
      className="bg-secondary rounded-xl p-3 flex justify-between items-center"
    >
      <div>
        <p className="text-xs font-bold mb-1">{achievement.title}</p>
        <p className="text-xs text-muted-foreground">{achievement.label}</p>
      </div>

      <div>{achievement.icon}</div>
    </Motion>
  );
}
