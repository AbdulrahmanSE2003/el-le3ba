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
  // RBAC: member blocked from admin, admin blocked from super-admin + logs.
  const m = await api("GET", "/admin/dashboard/stats", { label: "cap1", raw: true });
  test("member blocked from admin dashboard (403)", m.status === 403, `http=${m.status}`);

  const a = await api("GET", "/super-admin/stats", { label: "admin1", raw: true });
  test("admin blocked from super-admin stats (403)", a.status === 403, `http=${a.status}`);

  const l = await api("GET", "/logs", { label: "admin1", raw: true });
  test("admin blocked from logs (403)", l.status === 403, `http=${l.status}`);

  // Super-admin reachable areas.
  const sa = await api("GET", "/super-admin/stats", { label: "superAdmin", raw: true });
  test("superAdmin reaches super-admin stats (200)", sa.status === 200 && sa.data?.status === true, `http=${sa.status} ${JSON.stringify(sa.data)}`);

  const logs = await api("GET", "/logs", { label: "superAdmin", raw: true });
  const logRows = arrOf(logs.data || {});
  test("superAdmin reads logs (200) with entries", logs.status === 200 && Array.isArray(logRows), `http=${logs.status} n=${logRows.length}`);

  // Admin areas.
  const d = await api("GET", "/admin/dashboard/stats", { label: "admin1", raw: true });
  test("admin reaches dashboard stats (200)", d.status === 200 && d.data?.status === true, `http=${d.status}`);

  const users = await api("GET", "/admin/users", { label: "admin1", raw: true });
  const urows = arrOf(users.data || {});
  test("admin lists users", users.status === 200 && urows.length > 0, `n=${urows.length}`);

  const teams = await api("GET", "/admin/teams", { label: "admin1", raw: true });
  const trows = arrOf(teams.data || {});
  test("admin lists teams", teams.status === 200 && Array.isArray(trows), `n=${trows.length}`);

  const admins = await api("GET", "/super-admin/admins", { label: "superAdmin", raw: true });
  const arows = arrOf(admins.data || {});
  test("superAdmin lists admins", admins.status === 200 && arows.length > 0, `n=${arows.length}`);

  note(`users=${urows.length} teams=${trows.length} admins=${arows.length}`);
}