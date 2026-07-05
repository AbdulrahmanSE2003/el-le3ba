import { containerVariants, fadeInLeft } from "@/components/shared/animations";
import StyleContainer from "../StyleContainer";
import { Dices } from "lucide-react";
import LastGamesCard from "./LastGamesCard";
import { lastGames } from "../../last-games";
import Motion from "@/components/shared/Motion";

export default function LastGames() {
  return (
    <StyleContainer
      header="آخر الألعاب"
      icon={Dices}
      iconColor="text-primary"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.9 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-5"
      >
        {lastGames.map((game) => (
          <LastGamesCard key={game.title} {...game} />
        ))}
      </Motion>
    </StyleContainer>
  );
}
