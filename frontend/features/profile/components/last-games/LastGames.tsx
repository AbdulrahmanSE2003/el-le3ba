import { containerVariants, fadeInLeft } from "@/components/shared/animations";
import Motion from "@/components/shared/Motion";

import { Dices } from "lucide-react";

import StyleContainer from "../StyleContainer";
import LastGamesCard from "./LastGamesCard";

import { UserProfileProps } from "../../types";

export default function LastGames({ user }: UserProfileProps) {
  const { lastSessions } = user;

  return (
    <StyleContainer
      header="آخر الألعاب"
      icon={Dices}
      iconColor="text-primary"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
    >
      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-5"
      >
        {lastSessions?.map((session) => (
          <LastGamesCard key={session._id} session={session} />
        ))}
      </Motion>
    </StyleContainer>
  );
}
