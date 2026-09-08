import { io } from "socket.io-client";
import { api } from "./lib/http.mjs";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const WS = "http://localhost:5000";
const connect = () => new Promise((res, rej) => { const s = io(WS, { transports: ["websocket"], forceNew: true, reconnection: false }); s.on("connect", () => res(s)); s.on("connect_error", rej); });
const wait = (s, ev, ms = 8000) => Promise.race([new Promise((res) => s.once(ev, res)), delay(ms).then(() => "TIMEOUT")]);

const teamInfo = await api("GET", "/teams/my-team", { label: "cap2" });
const teamId = teamInfo?.team?.team?._id;
const captainId = (await api("GET", "/users/me", { label: "cap2" })).userData._id;

async function variant(name) {
  const s = await connect();
  s.emit("join-lobby", { teamId, userId: captainId });
  await delay(200);
  if (name === "A only-started .once") { s.once("game-started", () => {}); }
  if (name === "B started+error .once") { s.once("game-started", () => {}); s.once("game-error", () => {}); }
  if (name === "C both .on") { s.on("game-started", () => {}); s.on("game-error", () => {}); }
  if (name === "D started .once + error-poll") { s.once("game-started", () => {}); }
  s.emit("start-game", { teamId, userId: captainId });
  const ev = await wait(s, "game-started");
  console.log(`${name}: game-started=`, ev === "TIMEOUT" ? "TIMEOUT" : "OK");
  s.disconnect();
}

// D also polls for game-error after start
await variant("A only-started .once");
await delay(400);
await variant("B started+error .once");
await delay(400);
await variant("C both .on");
await delay(400);
{
  const s = await connect();
  s.emit("join-lobby", { teamId, userId: captainId });
  await delay(200);
  const gp = wait(s, "game-error");
  s.emit("start-game", { teamId, userId: captainId });
  const err = await gp;
  console.log("D error-only listener: game-error=", err === "TIMEOUT" ? "TIMEOUT" : JSON.stringify(err));
  s.disconnect();
}

process.exit(0);