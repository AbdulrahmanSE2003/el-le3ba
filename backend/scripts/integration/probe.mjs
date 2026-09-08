import { io } from "socket.io-client";
import { api, getToken } from "./lib/http.mjs";

const WS = "http://localhost:5000";
const s = io(WS, { transports: ["websocket"], forceNew: true, reconnection: false });

s.on("connect", async () => {
  console.log("connected", s.id);
  const teamId = (await api("GET", "/teams/my-team", { label: "cap1" })).team.team._id;
  console.log("teamId", teamId);
  s.on("game-started", (p) => { console.log("GAME-STARTED", p.sessionId, "nQ", p.questions?.length); s.close(); process.exit(0); });
  s.on("game-error", (p) => { console.log("GAME-ERROR", JSON.stringify(p)); s.close(); process.exit(0); });
  s.emit("join-lobby", { teamId, userId: (await api("GET","/users/me",{label:"cap1"})).userData._id });
  setTimeout(() => { console.log("about to start-game"); s.emit("start-game", { teamId, userId: (await api("GET","/users/me",{label:"cap1"})).userData._id }); }, 500);
  setTimeout(() => { console.log("TIMEOUT: no game-started"); s.close(); process.exit(1); }, 8000);
});
s.on("connect_error", (e) => { console.log("CONN_ERR", e.message); process.exit(1); });
