import { RecentSession } from "@/shared/api/helpers";
import MatchHistoryList from "./MatchHistoryList";

export default function MatchHistoryWrapper({
  recentSessions,
}: {
  recentSessions: RecentSession[];
}) {
  return <MatchHistoryList sessions={recentSessions} />;
}
