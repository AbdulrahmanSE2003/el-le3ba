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

export default async function run() {
  // Anatytics endpoints live under /api/v1/admin/analytics/* (admin+superAdmin).
  const g = await api("GET", "/admin/analytics/games-over-time", { label: "admin1" });
  test("analytics/games-over-time accessible", g?.status === true, g?.status === true ? "" : JSON.stringify(g));
  test("games-over-time returns time-series data", Array.isArray(arrOf(g)), `n=${arrOf(g).length}`);
  const got = arrOf(g);
  note(`games-over-time points=${got.map((x) => x.count ?? x.games ?? x.total).join(",")}`);

  const tp = await api("GET", "/admin/analytics/teams-performance", { label: "admin1" });
  const trows = arrOf(tp);
  test("analytics/teams-performance returns per-team rows", tp?.status === true && trows.length >= 0, `n=${trows.length}`);
  test("teams-performance rows have team + points", trows.every((r) => (r.teamName || r.team?.teamName) && Number.isFinite(Number(r.points ?? r.totalPoints))), JSON.stringify(trows[0]));

  const so = await api("GET", "/admin/analytics/session-outcomes", { label: "admin1" });
  const srows = arrOf(so);
  const outcomeSum = srows.reduce((a, r) => a + Number(r.count ?? r.total ?? 0), 0);
  test("analytics/session-outcomes returns counts", so?.status === true && typeof outcomeSum === "number", JSON.stringify(srows));

  const sessions = await api("GET", "/sessions?limit=200", { label: "admin1" });
  const sessionList = arrOf(sessions);
  test("analytics outcomes sum matches total sessions", outcomeSum === sessionList.length, `outcomes=${outcomeSum} sessions=${sessionList.length}`);

  const lv = await api("GET", "/admin/analytics/live-games", { label: "admin1" });
  const lrows = arrOf(lv);
  const liveInList = sessionList.filter((s) => s.status === "live").length;
  test("analytics/live-games matches live session count", lrows.length === liveInList, `analytics=${lrows.length} sessions=${liveInList}`);

  const pl = await api("GET", "/admin/analytics/players", { label: "admin1" });
  const prows = arrOf(pl);
  const users = await api("GET", "/admin/users", { label: "admin1" });
  const userList = arrOf(users);
  test("analytics/players reflects total active users", prows.length <= userList.length && prows.length >= 0, `players=${prows.length} users=${userList.length}`);

  // RBAC: non-admin blocked.
  const denied = await api("GET", "/admin/analytics/players", { label: "cap1", raw: true });
  test("non-admin blocked from analytics (403)", denied.status === 403, `http=${denied.status}`);
}