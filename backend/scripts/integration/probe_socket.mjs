import { io } from "socket.io-client";
import { api } from "./lib/http.mjs";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const WS = "http://localhost:5000";
const evs = ["team-presence", "game-started", "game-error", "answer-locked", "question-result", "next-question", "game-ended"];

function connect() {
  return new Promise((resolve, reject) => {
    const s = io(WS, { transports: ["websocket"], forceNew: true, reconnection: false });
    s.on("connect", () => resolve(s));
    s.on("connect_error", (e) => reject(e));
  });
}

const capSock = await connect();
const memSock = await connect();
evs.forEach((ev) => capSock.on(ev, (p) => console.log(`[CAP:${ev}]`, JSON.stringify(p || null))));
evs.forEach((ev) => memSock.on(ev, (p) => console.log(`[MEM:${ev}]`, JSON.stringify(p || null))));

const teamInfo = await api("GET", "/teams/my-team", { label: "cap3" });
const teamId = teamInfo?.team?.team?._id;
const captainId = (await api("GET", "/users/me", { label: "cap3" })).userData._id;
const memberId = (await api("GET", "/users/me", { label: "member18" })).userData._id;
console.log("teamId:", teamId, "cap:", captainId, "mem:", memberId);

capSock.emit("join-lobby", { teamId, userId: captainId });
memSock.emit("join-lobby", { teamId, userId: memberId });
await delay(300);

console.log("--- dance ---");
const presenceP = new Promise((res, rej) => { const t = setTimeout(() => rej(new Error("presence timeout")), 10000); memSock.once("team-presence", (p) => { clearTimeout(t); res(p); }); });
capSock.emit("leave-lobby", { teamId, userId: captainId });
capSock.emit("join-lobby", { teamId, userId: captainId });
await presenceP;
console.log("--- dance done, sleep 200 ---");
await delay(200);

console.log("--- emit start-game (both listeners registered now) ---");
const result = await Promise.race([
  new Promise((res, rej) => { const t = setTimeout(() => rej(new Error("TIMEOUT")), 15000); const done = (type, p) => { clearTimeout(t); res({ type, payload: p }); }; capSock.once("game-started", (p) => done("started", p)); capSock.once("game-error", (p) => done("error", p)); }),
]);
console.log("RESULT:", JSON.stringify(result.type), result.payload?.sessionId || JSON.stringify(result.payload)?.slice(0, 120));

capSock.disconnect(); memSock.disconnect();
process.exit(0);