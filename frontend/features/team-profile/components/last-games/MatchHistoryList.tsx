import StyleContainer from "@/components/shared/StyleContainer";

import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";

import { sessions } from "../../constants";

import NoGames from "./NoGames";
import Header from "./Header";
// import LoadMore from "./LoadMore";
import SessionCard from "./session-card/SessionCard";

export default function MatchHistoryList() {
  if (sessions.length === 0) {
    return <NoGames />;
  }

  return (
    <StyleContainer className="p-6 md:p-8">
      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <Header sessionsLen={sessions.length} />

        {sessions.map((session) => {
          return <SessionCard key={session._id} session={session} />;
        })}
      </Motion>

      {/* Load More */}
      {/* <LoadMore /> */}
    </StyleContainer>
  );
}
