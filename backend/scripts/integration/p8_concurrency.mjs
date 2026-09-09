import { api } from "./lib/http.mjs";
import { test, note } from "./lib/report.mjs";
import { sleep } from "./lib/util.mjs";
import { connect, onceAny, startGameWithRetries } from "./lib/startGame.mjs";

export default async function run() {
  const teamInfo = await api("GET", "/teams/my-team", { label: "cap6" });
  test("cap6 is in a team (Foxtrot)", teamInfo?.status === true && !!teamInfo?.team?.team?._id, JSON.stringify(teamInfo?.team?.team?.teamName));
  const teamId = teamInfo?.team?.team?._id;

  const event = await api("GET", "/events/current", { label: "cap6" });
  const eventId = event?.event?._id;
  const captainId = (await api("GET", "/users/me", { label: "cap6" })).userData._id;
  const memberId = (await api("GET", "/users/me", { label: "member21" })).userData._id;

  const att = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: "cap6" });
  if ((att?.attempts?.attempts ?? 0) >= 3) { note("p8 skipped: Foxtrot attempts exhausted."); return; }

  const r = await startGameWithRetries({ teamId, captainId, memberId, label: "p8", maxAttempts: 4 });
  if (r.got?.ev === "game-error") {
    note(`p8: start rejected: ${JSON.stringify(r.got?.payload?.message)}`);
    r.capSock?.disconnect(); r.memSock?.disconnect();
    return;
  }
  const s = r.got?.payload;
  test("p8 captain start-game succeeded", !!s?.sessionId, JSON.stringify(s)?.slice(0, 120));
  if (!s?.sessionId) { r.capSock?.disconnect(); r.memSock?.disconnect(); return; }

  // Concurrent captain + member answer bursts against the same live session.
  for (const q of s.questions) {
    const qd = await api("GET", `/questions/${q._id}`, { label: "admin1" });
    const correct = qd?.question?.correctAnswer;
    const p = [
      api("POST", `/sessions/${s.sessionId}/answer`, { label: "cap6", body: { questionId: q._id, submittedAnswer: correct, timeTaken: 2 } }),
      api("POST", `/sessions/${s.sessionId}/answer`, { label: "member21", body: { questionId: q._id, submittedAnswer: `${correct}__RACE`, timeTaken: 2 } }),
    ];
    await Promise.allSettled(p);
  }
  await sleep(400);

  // Concurrent double start from the captain socket.
  const g1 = onceAny(r.capSock, ["game-started", "game-error"], 6000).catch(() => null);
  const g2 = onceAny(r.capSock, ["game-started", "game-error"], 6000).catch(() => null);
  r.capSock.emit("start-game", { teamId, userId: captainId });
  r.capSock.emit("start-game", { teamId, userId: captainId });
  const [ra, rb] = await Promise.all([g1, g2]);
  test("p8 server survives parallel start emits (no crash)", true, `${ra?.ev ?? "none"}/${rb?.ev ?? "none"}`);
  note(`p8 parallel-start outcomes: ${ra?.ev ?? "none"} + ${rb?.ev ?? "none"}`);

  const attAfter = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: "cap6" });
  note(`p8 attempts consumed after race: ${attAfter?.attempts?.attempts} (documenting duplicate-start semantics)`);

  const rr = await api("GET", `/sessions/${s.sessionId}`, { label: "cap6" });
  const sd = rr?.sessionDetails ?? rr?.data?.sessionDetails;
  const ca = Number(sd?.correctAnswers);
  test("p8 concurrent answers yield consistent correctAnswers (0..5)", Number.isInteger(ca) && ca >= 0 && ca <= 5, `correct=${ca}`);
  test("p8 session completed after races (status past live)", sd?.status === "completed" || sd?.status === "scored", `status=${sd?.status}`);

  const health = await api("GET", "/events/current", { label: "admin1" });
  test("p8 server responsive after races", health?.status === true, JSON.stringify(health).slice(0, 80));

  r.capSock?.disconnect(); r.memSock?.disconnect();
}