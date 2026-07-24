export const CACHE = {
  user: { cache: "no-store" as const },
  team: { cache: "no-store" as const },
  attempts: { cache: "no-store" as const },
  session: { cache: "no-store" as const },
  myRank: { cache: "no-store" as const },
  event: { revalidate: 30 },
  eventStats: { revalidate: 60 },
  leaderboard: { revalidate: 15 },
} as const;
