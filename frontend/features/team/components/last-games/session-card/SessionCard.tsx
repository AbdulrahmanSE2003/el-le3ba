import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";

import { sessionsType } from "../../../types";


import CardInfo from "./CardInfo";
import CardStats from "./CardStats";

interface Props {
  session: sessionsType;
}

export default function SessionCard({ session }: Props) {
  return (
    <Motion
      as="div"
      key={session._id}
      variants={fadeInUp}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
    >
      {/* Left: Event info + status */}
      <CardInfo session={session} />

      {/* Right: Stats */}
      <CardStats session={session} />
    </Motion>
  );
}
