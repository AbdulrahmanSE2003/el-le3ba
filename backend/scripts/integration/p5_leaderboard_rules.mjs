import { api } from "./lib/http.mjs";
import { test, note } from "./lib/report.mjs";

function arrOf(body) {
  if (!body) return [];
  if (Array.isArray(body)) return body;
  const walk = (o) => {
    if (!o || typeof o !== "object") return null;
    const direct = Object.values(o).find((x) => Array.isArray(x));
    if (direct) return direct;
    for (const v of Object.values(o)) {
      const r = walk(v);
      if (r) return r;
    }
    return null;
  };
  return walk(body) ?? [];
}

const PTS = (e) => Number(e?.totalPoints ?? e?.points ?? e?.team?.points ?? 0);
const TEAM = (e) => e?.team?.teamName ?? e?.teamName ?? e?.teamId?.teamName ?? "?";

export default async function run() {
  const event = await api("GET", "/events/current", { label: "admin1" });
  const eventId = event?.event?._id;

  // Student view: ranking[] + myTeamRanking; admin view: flat array.
  const lb = await api("GET", `/leaderboard?eventId=${eventId}`, { label: "member16" });
  const entries = Array.isArray(lb?.leaderboard) ? lb.leaderboard : lb?.leaderboard?.ranking ?? [];
  test("leaderboard returns ranking list", Array.isArray(entries), `n=${entries.length}`);

  const points = entries.map(PTS);
  test("all leaderboard points are finite >= 0", points.every((p) => Number.isFinite(p) && p >= 0), JSON.stringify(points.slice(0, 5)));
  const sorted = points.every((p, i) => i === 0 || points[i - 1] >= p);
  test("ranking sorted by points desc", sorted, JSON.stringify(points.slice(0, 10)));

  const tt = await api("GET", `/leaderboard/top-three?eventId=${eventId}`, { label: "member16" });
  const top = arrOf(tt);
  test("top-three returns up to 3 entries", Array.isArray(top) && top.length <= 3, `n=${top.length}`);
  if (top.length === 0) note("No leaderboard entries yet — no finalized session in the current DB (reseed). Cross-checks below stay consistent at 0.");

  const mr = await api("GET", `/leaderboard/my-rank?eventId=${eventId}`, { label: "cap1" });
  const rank = mr?.MyRank?.rank;
  test("my-rank returns rank (present or null-when-unfinalized)", rank === null || Number.isFinite(Number(rank)), JSON.stringify(mr?.MyRank));

  const active = await api("GET", "/seasons/active", { label: "admin1" });
  const seasonId = active?.season?._id;
  let topSeason = 0;
  let srows = [];
  if (seasonId) {
    const sl = await api("GET", `/seasons/${seasonId}/leaderboard`, { label: "admin1" });
    srows = arrOf(sl);
    topSeason = srows.length ? PTS(srows[0]) : 0;
  }
  const topGeneral = points.length ? points[0] : 0;
  const topGeneralTeam = TEAM(entries[0] ?? {});
  const topSeasonTeam = TEAM(srows[0] ?? {});
  // Event points (totalPoints) and season points (seasonPoints) are aggregates
  // over different scopes, so the relevant consistency check is that the SAME
  // team tops both rankings.
  test(
    "general ranking top matches season leaderboard top",
    topGeneralTeam === topSeasonTeam,
    `general team=${topGeneralTeam} season team=${topSeasonTeam} | general=${topGeneral} season=${topSeason}`,
  );
  note(`eventId=${eventId} | leaderboard size=${entries.length} | top=${topGeneral} | teams-with-points=${points.filter((p) => p > 0).length}`);
}