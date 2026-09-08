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
  // 1) Exactly one running event in the system.
  const current = await api("GET", "/events/current", { label: "member16" });
  test("events/current returns the running event", current?.status === true && !!current?.event?._id, JSON.stringify(current?.event?.title));
  const eventId = current?.event?._id;

  const allE = await api("GET", "/events", { label: "admin1" });
  const events = arrOf(allE);
  const running = events.filter((e) => e.status === "running");
  test("exactly one event is running", running.length === 1, `running=${running.length} total=${events.length}`);

  const currentIsRunning = current?.event && events.find((e) => String(e._id) === String(current?.event?._id))?.status === "running";
  test("events/current points at the single running event", !!currentIsRunning, JSON.stringify(running.map((e) => e.title)));

  const qCount = Array.isArray(current?.event?.questions) ? current?.event?.questions.length : null;
  note(`Running event questions array: ${qCount === null ? "not exposed (noop)" : qCount}`);
  if (qCount !== null) {
    test("running event has 5 questions", qCount === 5, `count=${qCount}`);
  }

  // 2) Season invariants: exactly one active, one knockout.
const active = await api("GET", "/seasons/active", { label: "member16" });
  test("seasons/active returns a season", active?.status === true && !!active?.season?._id, JSON.stringify(active?.season?.title ?? active?.season?.seasonName));
  test("active season is in active state", String(active?.season?.status) === "active", `status=${active?.season?.status}`);

  const allS = await api("GET", "/seasons", { label: "admin1" });
  const seasons = arrOf(allS);
  const actives = seasons.filter((s) => s.status === "active");
  const knockouts = seasons.filter((s) => s.status === "knockout");
  test("exactly one active season", actives.length === 1, `active=${actives.length} total=${seasons.length}`);
  test("at most one knockout season (none required in seed)", knockouts.length <= 1, `knockout=${knockouts.length}`);
  note(`Season statuses seen: ${[...new Set(seasons.map((s) => s.status))].join(", ")}; knockout count=${knockouts.length}`);
}