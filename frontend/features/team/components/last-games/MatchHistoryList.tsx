import StyleContainer from "@/components/shared/StyleContainer";

import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";

import { RecentSession } from "@/shared/api/helpers";

import NoGames from "./NoGames";
import Header from "./Header";
import SessionCard from "./session-card/SessionCard";

export default function MatchHistoryList({
  sessions,
}: {
  sessions: RecentSession[];
}) {
  //NOTE: in case sessions are empty or undefined, render NoGames component
  if (!sessions?.length || !sessions) {
    return <NoGames />;
  }

  return (
    <StyleContainer className="p-6 md:p-8">
      <Header sessionsLen={sessions.length} />

      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {sessions.map((session) => {
          return <SessionCard key={session._id} session={session} />;
        })}
      </Motion>
    </StyleContainer>
  );
}
