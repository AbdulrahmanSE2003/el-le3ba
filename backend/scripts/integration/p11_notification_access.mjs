import { api } from "./lib/http.mjs";
import { test, note } from "./lib/report.mjs";

const LIST = (b) => b?.notifications?.notifications ?? [];
const UNREAD = (b) => LIST(b).some((n) => !n.isRead);

export default async function run() {
  const m16 = await api("GET", "/users/me", { label: "member16" });
  const m17 = await api("GET", "/users/me", { label: "member17" });
  const u16 = m16?.userData?._id;
  const u17 = m17?.userData?._id;

  const sent = await api("POST", "/admin/notifications", {
    label: "admin1",
    body: { title: "IT Notification (p11)", message: "Please review.", userIds: [u16, u17] },
  });
  test("admin sends selected notification (201)", sent?.status === true && !!sent?.campaign?._id, JSON.stringify(sent?.campaign));
  const campaignId = sent?.campaign?._id;

  const n16 = await api("GET", "/notifications", { label: "member16" });
  const n17 = await api("GET", "/notifications", { label: "member17" });
  const c16 = LIST(n16).filter((n) => String(n.campaignId?._id ?? n.campaignId) === String(campaignId));
  const c17 = LIST(n17).filter((n) => String(n.campaignId?._id ?? n.campaignId) === String(campaignId));
  test("member16 received exactly 1 notification", c16.length === 1, `n=${c16.length}`);
  test("member17 received exactly 1 notification", c17.length === 1, `n=${c17.length}`);
  test("notifications arrive unread", c16.every((n) => !n.isRead) && c17.every((n) => !n.isRead), JSON.stringify({ m16: c16.length, m17: c17.length }));

  await api("PATCH", "/notifications/all", { label: "member16" });
  const n16b = await api("GET", "/notifications", { label: "member16" });
  test("markAllAsRead marks member16 notifications read", LIST(n16b).every((n) => n.isRead), JSON.stringify(LIST(n16b).map((n) => n.isRead)));

  const nid17 = c17[0]?._id;
  const intrude = await api("PATCH", `/notifications/${nid17}`, { label: "member16", raw: true });
  test("IDOR: member16 CANNOT mark member17's notification (blocked)", intrude.status !== 200, `http=${intrude.status} ${JSON.stringify(intrude.data)}`);
  note(`markAsRead IDOR repro: http=${intrude.status}. ${intrude.status === 200 ? "CONFIRMED BUG — cross-user mutation." : "blocked as expected."}`);

  const n17c = await api("GET", "/notifications", { label: "member17" });
  const tgt = LIST(n17c).find((n) => String(n.campaignId?._id ?? n.campaignId) === String(campaignId));
  test("IDOR: member17's notification still unread after intruder mark", tgt?.isRead === false, `isRead=${tgt?.isRead}`);

  // A) member17 marks its own notification -> succeeds.
  const own = await api("PATCH", `/notifications/${nid17}`, { label: "member17", raw: true });
  test("member17 can mark own notification read (200)", own.status === 200 && own.data?.status === true, `http=${own.status} ${JSON.stringify(own.data)}`);
  const n17d = await api("GET", "/notifications", { label: "member17" });
  const tgt2 = LIST(n17d).find((n) => String(n.campaignId?._id ?? n.campaignId) === String(campaignId));
  test("member17's own notification is now read", tgt2?.isRead === true, `isRead=${tgt2?.isRead}`);

  const bc = await api("POST", "/admin/notifications", {
    label: "admin1",
    body: { title: "IT Broadcast (p11)", message: "System notice.", broadcast: true },
  });
  test("admin broadcast notification (201) with recipients", bc?.status === true && Number(bc?.campaign?.recipientsCount) > 0, `recipients=${bc?.campaign?.recipientsCount}`);

  if (campaignId) await api("DELETE", `/admin/notifications/${campaignId}`, { label: "admin1" });
  if (bc?.campaign?._id) await api("DELETE", `/admin/notifications/${bc?.campaign?._id}`, { label: "admin1" });
  note(`Campaigns cleaned: ${String(campaignId)}, ${String(bc?.campaign?._id)}`);
}