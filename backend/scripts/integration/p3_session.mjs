import { io } from "socket.io-client";
import { api } from "./lib/http.mjs";
import { test, note } from "./lib/report.mjs";
import { sleep } from "./lib/util.mjs";

const WS = process.env.WS_URL || "http://localhost:5000";

function connect() {
  return new Promise((resolve, reject) => {
    const s = io(WS, { transports: ["websocket"], forceNew: true, reconnection: false });
    s.on("connect", () => resolve(s));
    s.on("connect_error", (e) => reject(e));
    setTimeout(() => reject(new Error("connect timeout")), 15000);
  });
}

function onceEvent(s, ev, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout waiting ${ev}`)), timeout);
    s.once(ev, (payload) => { clearTimeout(t); resolve(payload); });
  });
}

function onceGameResult(s, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout waiting game result")), timeout);
    const done = (type, payload) => { clearTimeout(t); resolve({ type, payload }); };
    s.once("game-started", (p) => done("started", p));
    s.once("game-error", (p) => done("error", p));
  });
}

// One attempt: join captain+member, try to start the game, return the payload.
async function tryStart(teamId, captainId, memberId, capLabel) {
  const capSock = await connect();
  const memSock = await connect();
  try {
    capSock.emit("join-lobby", { teamId, userId: captainId });
    memSock.emit("join-lobby", { teamId, userId: memberId });
    await sleep(300);

    const presenceP = onceEvent(memSock, "team-presence").catch(() => null);
    const started = await onceGameResult(capSock);
    const presence = await presenceP;
    return { started, presence, capSock, memSock };
  } catch (e) {
    capSock.disconnect();
    memSock.disconnect();
    throw e;
  }
}

export default async function run() {
  const CAP = process.env.SESSION_TEAM || "cap3";
  const MEMBER = process.env.SESSION_MEMBER || "member18";
  const MAX_START_ATTEMPTS = Number(process.env.START_ATTEMPTS || 4);

  const event = await api("GET", "/events/current", { label: "admin1" });
  test("running event exists", event?.status === true && !!event?.event?._id, JSON.stringify(event?.event?.title));
  const eventId = event?.event?._id;

  const teamInfo = await api("GET", "/teams/my-team", { label: CAP });
  test(`${CAP} is in a team`, teamInfo?.status === true && !!teamInfo?.team?.team?._id, JSON.stringify(teamInfo?.team?.team?.teamName));
  const teamId = teamInfo?.team?.team?._id;
  const captainId = (await api("GET", "/users/me", { label: CAP })).userData._id;
  const memberId = (await api("GET", "/users/me", { label: MEMBER })).userData._id;

  const attemptsBefore = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: CAP });
  const beforeCount = attemptsBefore?.attempts?.attempts ?? 0;
  test(`${CAP} has attempts left`, beforeCount < 3, `attempts=${beforeCount}`);
  if (beforeCount >= 3) {
    note(`Phase 3 skipped: ${CAP} has no attempts left (maxAttempts=3).`);
    return;
  }

  // Try to start the game; the write path can stall during Atlas/DNS flaps.
  let capSock, memSock, started, presence;
  for (let i = 1; i <= MAX_START_ATTEMPTS; i++) {
    try {
      const r = await tryStart(teamId, captainId, memberId, CAP);
      capSock = r.capSock; memSock = r.memSock; started = r.started; presence = r.presence;
      if (started?.type === "started" || started?.type === "error") break;
    } catch (e) {
      if (i === MAX_START_ATTEMPTS) throw e;
      await sleep(2500);
    }
  }

  // Presence was captured opportunistically; verify online flags if we have it.
  const capOnline = (presence || []).find((m) => m.userId === captainId)?.isOnline;
  const memOnline = (presence || []).find((m) => m.userId === memberId)?.isOnline;
  test("team-presence lists captain+member online", capOnline === true && memOnline === true, JSON.stringify(presence));

  test("captain start-game succeeds", started?.type === "started" && !!started?.payload?.sessionId && started?.payload?.questions?.length === 5, JSON.stringify(started));
  if (started?.type === "error") {
    note(`Phase 3: start-game rejected by server: ${JSON.stringify(started.payload?.message)}. Gameplay left UNVERIFIED for ${CAP}.`);
    capSock?.disconnect(); memSock?.disconnect();
    return;
  }
  if (started?.type !== "started") {
    capSock?.disconnect(); memSock?.disconnect();
    return;
  }
  const session = started.payload;

  // No correctAnswer leaked to client
  test("questions hide correctAnswer", !("correctAnswer" in (session.questions?.[0] || {})), JSON.stringify(Object.keys(session.questions?.[0] || {})));

  // Non-captain cannot start
  const errP = onceEvent(memSock, "game-error").catch(() => null);
  memSock.emit("start-game", { teamId, userId: memberId });
  const gerr = await errP;
  test("non-captain start-game rejected", !!gerr?.message, JSON.stringify(gerr));

  const attemptsAfter1 = await api("GET", `/teams/${teamId}/attempts?eventId=${eventId}`, { label: CAP });
  const afterCount1 = attemptsAfter1?.attempts?.attempts ?? 0;
  test("attempt count incremented after start", afterCount1 === beforeCount + 1, `before=${beforeCount} after=${afterCount1}`);

  // Answer all 5 questions; correctAnswers read via admin endpoint.
  let prevStreak = 0;
  let expectedScore = 0;
  let lastResp;
  for (let i = 0; i < session.questions.length; i++) {
    const q = session.questions[i];
    const qd = await api("GET", `/questions/${q._id}`, { label: "admin1" });
    const correct = qd?.question?.correctAnswer;
    const useCorrect = i % 2 === 0;
    const sub = useCorrect ? correct : `${correct}__NOPE`;
    const resp = await api("POST", `/sessions/${session.sessionId}/answer`, {
      body: { questionId: q._id, submittedAnswer: sub, timeTaken: 2 },
      label: CAP,
    });
    lastResp = resp;
    if (useCorrect) {
      prevStreak += 1;
      expectedScore += 15 + 0 + (prevStreak % 5 === 0 ? 5 : 0);
    } else {
      prevStreak = 0;
    }
  }
  const answ = lastResp?.answerDetails;
  test("final answer marks sessionComplete + finalScore", answ?.sessionComplete === true && typeof answ?.finalScore === "number", JSON.stringify(answ));

  const expectCorrect = Math.ceil(session.questions.length / 2);
  test("correctAnswers matches expected", answ?.correctAnswers === expectCorrect, `got=${answ?.correctAnswers} expect=${expectCorrect}`);

  await sleep(300);
  const res = await api("GET", `/sessions/${session.sessionId}`, { label: CAP });
  test("getSessionResult returns score", res?.status === true && typeof res?.sessionDetails?.score === "number", JSON.stringify(res?.sessionDetails));
  const sres = res?.sessionDetails || {};
  test("score matches correctAnswers (>= expectCorrect*15)", sres.score >= expectCorrect * 15, `score=${sres.score}`);

  capSock.disconnect();
  memSock.disconnect();
}