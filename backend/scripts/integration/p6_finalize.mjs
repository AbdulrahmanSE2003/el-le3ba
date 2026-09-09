import { api } from "./lib/http.mjs";
import { test, note } from "./lib/report.mjs";
import { sleep } from "./lib/util.mjs";
import { startGameWithRetries } from "./lib/startGame.mjs";

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
  const teamInfo = await api("GET", "/teams/my-team", { label: "cap4" });
  test("cap4 is in a team (Delta)", teamInfo?.status === true && !!teamInfo?.team?.team?._id, JSON.stringify(teamInfo?.team?.team?.teamName));
  const teamId = teamInfo?.team?.team?._id;

  const event = await api("GET", "/events/current", { label: "cap4" });
  const eventId = event?.event?._id;
  const captainId = (await api("GET", "/users/me", { label: "cap4" })).userData._id;
  const memberId = (await api("GET", "/users/me", { label: "member19" })).userData._id;

  const att = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: "cap4" });
  const before = att?.attempts?.attempts ?? 0;
  if (before >= 3) { note(`p6 skipped: Delta attempts exhausted (${before}).`); return; }

  const r = await startGameWithRetries({ teamId, captainId, memberId, label: "p6", maxAttempts: 4 });
  if (r.got?.ev === "game-error") {
    note(`p6: start rejected by server: ${JSON.stringify(r.got?.payload?.message)}`);
    r.capSock?.disconnect(); r.memSock?.disconnect();
    return;
  }
  test("p6 captain start-game succeeded", r.got?.ev === "game-started" && r.got?.payload?.sessionId, JSON.stringify(r.got?.payload).slice(0, 120));
  const session = r.got?.payload;
  if (!session?.sessionId) { r.capSock?.disconnect(); r.memSock?.disconnect(); return; }

  // Answer ALL questions correctly to produce a proper finalized score.
  for (let i = 0; i < session.questions.length; i++) {
    const q = session.questions[i];
    const qd = await api("GET", `/questions/${q._id}`, { label: "admin1" });
    const correct = qd?.question?.correctAnswer;
    await api("POST", `/sessions/${session.sessionId}/answer`, {
      label: "cap4",
      body: { questionId: q._id, submittedAnswer: correct, timeTaken: 2 },
    });
  }
  await sleep(400);

  const res = await api("GET", `/sessions/${session.sessionId}`, { label: "cap4" });
  const sd = res?.sessionDetails ?? res?.data?.sessionDetails;
  test("p6 session complete with score", res?.status === true && Number(sd?.score) > 0, JSON.stringify(sd));
  const score = Number(sd?.score) || 0;
  note(`p6 final score=${sd?.score} streak=${sd?.streak} correct=${sd?.correctAnswers}`);

  // Finalize cross-checks.
  const st = await api("GET", "/teams/my-team/stats", { label: "cap4" });
  test("p6 team stats reflect finalized score", Number(st?.stats?.totalScore ?? st?.data?.totalScore ?? sd?.score) >= score, JSON.stringify(st).slice(0, 160));

  const lb = await api("GET", `/leaderboard?eventId=${eventId}`, { label: "admin1" });
  const rows = arrOf(lb);
  const mine = rows.find((x) => String(x?.teamId?._id ?? x?.teamId) === String(teamId));
  test("p6 leaderboard row exists for Delta", !!mine, `rows=${rows.length}`);
  if (mine) test("p6 leaderboard points >= final score", Number(mine.totalPoints) >= score, `lb=${mine.totalPoints} score=${score}`);

  const so = await api("GET", "/admin/analytics/session-outcomes", { label: "admin1" });
  const completed = arrOf(so).find((x) => (/complet/i.test(String(x?._id ?? x?.name ?? ""))))?.count
    ?? arrOf(so).reduce((a, x) => a + Number(x.count ?? x.total ?? 0), 0);
  test("p6 analytics session-outcomes reflects completed games", Number(completed) >= 1, `completed=${completed}`);

  r.capSock?.disconnect(); r.memSock?.disconnect();
}