import { api } from "./lib/http.mjs";
import { test, note } from "./lib/report.mjs";
import { sleep } from "./lib/util.mjs";
import { startGameWithRetries } from "./lib/startGame.mjs";

export default async function run() {
  const teamInfo = await api("GET", "/teams/my-team", { label: "cap5" });
  test("cap5 is in a team (Echo)", teamInfo?.status === true && !!teamInfo?.team?.team?._id, JSON.stringify(teamInfo?.team?.team?.teamName));
  const teamId = teamInfo?.team?.team?._id;

  const event = await api("GET", "/events/current", { label: "cap5" });
  const eventId = event?.event?._id;
  const captainId = (await api("GET", "/users/me", { label: "cap5" })).userData._id;
  const memberId = (await api("GET", "/users/me", { label: "member20" })).userData._id;

  const att = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: "cap5" });
  const before = att?.attempts?.attempts ?? 0;

  // A) Start one real game, force all-wrong answers -> finalScore 0, no aggregate.
  const r1 = await startGameWithRetries({ teamId, captainId, memberId, label: "p7a", maxAttempts: 4 });
  if (r1.got?.ev === "game-error") {
    note(`p7a: start rejected: ${JSON.stringify(r1.got?.payload?.message)}`);
    r1.capSock?.disconnect(); r1.memSock?.disconnect();
  } else if (r1.got?.payload?.sessionId) {
    const s1 = r1.got.payload;
    // Validation: missing questionId -> 400
    const bad = await api("POST", `/sessions/${s1.sessionId}/answer`, {
      label: "cap5",
      body: { submittedAnswer: "x", timeTaken: 2 },
      raw: true,
    });
    test("p7 answer missing questionId rejected (400)", bad.status === 400, `http=${bad.status} ${JSON.stringify(bad.data)}`);

    for (const q of s1.questions) {
      const qd = await api("GET", `/questions/${q._id}`, { label: "admin1" });
      const w = `${qd?.question?.correctAnswer}__WRONG`;
      const rr = await api("POST", `/sessions/${s1.sessionId}/answer`, {
        label: "cap5",
        body: { questionId: q._id, submittedAnswer: w, timeTaken: 2 },
        raw: true,
      });
      // Re-answering question 0 twice: second hit should be rejected/ignored.
      if (String(q._id) === String(s1.questions[0]._id)) {
        const dup = await api("POST", `/sessions/${s1.sessionId}/answer`, {
          label: "cap5",
          body: { questionId: q._id, submittedAnswer: w, timeTaken: 2 },
          raw: true,
        });
        note(`p7 duplicate-answer for q1 -> http=${dup.status} ${JSON.stringify(dup.data)?.slice(0, 120)}`);
      }
    }
    await sleep(400);
    const r = await api("GET", `/sessions/${s1.sessionId}`, { label: "cap5" });
    const sd = r?.sessionDetails ?? r?.data?.sessionDetails;
    test("p7 all-wrong answers -> finalScore 0", Number(sd?.score) === 0, `score=${sd?.score}`);
    test("p7 all-wrong answers -> correctAnswers 0", Number(sd?.correctAnswers) === 0, `correct=${sd?.correctAnswers}`);
  }

  // B) Abandon path: start a game, abandon via REST -> finalScore 0, live session resolved.
  const att2 = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: "cap5" });
  const b2 = att2?.attempts?.attempts ?? before;
  if (b2 < 3) {
    const r2 = await startGameWithRetries({ teamId, captainId, memberId, label: "p7b", maxAttempts: 4 });
    if (r2.got?.ev === "game-error") {
      note(`p7b: start rejected: ${JSON.stringify(r2.got?.payload?.message)}`);
    } else if (r2.got?.payload?.sessionId) {
      const ax = await api("POST", `/sessions/${r2.got.payload.sessionId}/abandon`, { label: "cap5", raw: true });
      test("p7 abandon accepted", ax.status === 200 && ax.data?.status === true, `http=${ax.status} ${JSON.stringify(ax.data)}`);
      await sleep(300);
      const ar = await api("GET", `/sessions/${r2.got.payload.sessionId}`, { label: "cap5" });
      const ad = ar?.sessionDetails ?? ar?.data?.sessionDetails;
      test("p7 abandoned session score is 0", Number(ad?.score) === 0, `score=${ad?.score}`);
      const att3 = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: "cap5" });
      note(`p7 attempts: before=${before} abandon-start-consumed=${att3?.attempts?.attempts} (abandon keeps the session; attempt consumed at start)`);
    }
  }

  r1?.capSock?.disconnect(); r1?.memSock?.disconnect();
}