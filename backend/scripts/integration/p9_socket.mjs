import { api } from "./lib/http.mjs";
import { test, note } from "./lib/report.mjs";
import { connect, onceAny } from "./lib/startGame.mjs";

export default async function run() {
  // Real team ids.
  const bravo = await api("GET", "/teams/my-team", { label: "cap2" });
  const alpha = await api("GET", "/teams/my-team", { label: "cap1" });
  const bravoId = bravo?.team?.team?._id;
  const alphaId = alpha?.team?.team?._id;
  const cap2Id = (await api("GET", "/users/me", { label: "cap2" })).userData._id;
  const cap1Id = (await api("GET", "/users/me", { label: "cap1" })).userData._id;
  const m17Id = (await api("GET", "/users/me", { label: "member17" })).userData._id;

  // T1: real members join Bravo -> presence broadcast lists both online.
  const a = await connect();
  const b = await connect();
  const presenceP = onceAny(b, ["team-presence"], 6000);
  a.emit("join-lobby", { teamId: bravoId, userId: cap2Id });
  b.emit("join-lobby", { teamId: bravoId, userId: m17Id });
  const p1 = await presenceP;
  const pr = p1?.payload ?? [];
  const capOnline = pr.find((m) => String(m.userId) === String(cap2Id))?.isOnline;
  const memOnline = pr.find((m) => String(m.userId) === String(m17Id))?.isOnline;
  test("presence broadcast lists captain+member online", capOnline === true && memOnline === true, JSON.stringify(pr));

  // T2: impersonation join (unauth socket claiming cap1) into Alpha.
  const bad = await connect();
  let rejected = false;
  bad.on("disconnect", () => { rejected = true; });
  const rosterP = onceAny(bad, ["team-presence"], 6000).catch(() => null);
  bad.emit("join-lobby", { teamId: alphaId, userId: cap1Id });
  const gotRoster = await rosterP;
  const badPayload = gotRoster?.payload ?? null;
  test("uni = unauth join rejected OR no roster leak", rejected === true || badPayload === null, JSON.stringify(badPayload ?? { rejected }));
  note(`Impersonation join: rejected=${rejected}, rosterReceived=${!!badPayload}. ${!rejected && !!badPayload ? "FINDING — unauthenticated socket can join a team lobby and read its roster (userId/teamId guessed)." : "blocked as expected."}`);
  bad.disconnect();

  // T3: non-captain (Bravo member) emits start-game -> game-error, no DB write.
  const err2 = onceAny(b, ["game-error"], 8000).catch(() => null);
  b.emit("start-game", { teamId: bravoId, userId: m17Id });
  const ge = await err2;
  test("non-captain start-game rejected with game-error", ge?.payload?.success === false || !!ge?.payload?.message, JSON.stringify(ge?.payload));

  // T4: unauth socket accepted at handshake (no token challenged).
  note(`Socket handshake accepts connections without a token (connect() succeeded). Any client that knows a teamId+userId can join-lobby/start-game on behalf of a user.`);

  a.disconnect();
  b.disconnect();
}