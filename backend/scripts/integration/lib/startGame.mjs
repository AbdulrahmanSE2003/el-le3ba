import { io } from "socket.io-client";
import { sleep } from "./util.mjs";

const WS = process.env.WS_URL || "http://localhost:5000";

export function connect() {
  return new Promise((resolve, reject) => {
    const s = io(WS, { transports: ["websocket"], forceNew: true, reconnection: false });
    s.on("connect", () => resolve(s));
    s.on("connect_error", (e) => reject(e));
    setTimeout(() => {
      s.disconnect();
      reject(new Error("connect timeout"));
    }, 15000);
  });
}

export function onceAny(s, evs, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout waiting ${evs.join("/")}`)), timeout);
    const done = (ev, payload) => {
      clearTimeout(t);
      resolve({ ev, payload });
    };
    evs.forEach((e) => s.once(e, (p) => done(e, p)));
  });
}

// Join captain+member to the lobby and try to start the game. Returns sockets for reuse.
export async function tryStart(teamId, captainId, memberId) {
  const capSock = await connect();
  let memSock = null;
  try {
    memSock = await connect();
    capSock.emit("join-lobby", { teamId, userId: captainId });
    memSock.emit("join-lobby", { teamId, userId: memberId });
    await sleep(400);
    const presenceP = onceAny(memSock, ["team-presence"], 5000).catch(() => { presenceP?.resolve?.(); return null; });
    const got = await onceAny(capSock, ["game-started", "game-error"]);
    let presence = null;
    try { presence = await presenceP; } catch { /* presence optional */ }
    return { got, presence, capSock, memSock };
  } catch (e) {
    capSock.disconnect();
    memSock?.disconnect();
    throw e;
  }
}

// Retry loop around start attempts (Atlas/DNS write-path flaps can stall the success path
// and time out; a few fresh-socket retries usually land in a healthy window).
export async function startGameWithRetries({ teamId, captainId, memberId, maxAttempts = 4, label }) {
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const r = await tryStart(teamId, captainId, memberId);
      if (r.got?.ev === "game-started" || r.got?.ev === "game-error") return r;
      r.capSock?.disconnect();
      r.memSock?.disconnect();
    } catch (e) {
      if (i === maxAttempts) throw new Error(`${label}: start attempts exhausted: ${e.message}`);
      await sleep(2500);
    }
  }
  throw new Error(`${label}: start attempts exhausted`);
}