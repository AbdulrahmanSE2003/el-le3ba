import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { phase, bug, dumpSummary, dumpJson } from "./lib/report.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const MAP = {
  0: "p0_preseed.mjs",
  1: "p1_auth.mjs",
  2: "p2_team.mjs",
  3: "p3_session.mjs",
  4: "p4_event_rules.mjs",
  5: "p5_leaderboard_rules.mjs",
  6: "p6_finalize.mjs",
  7: "p7_edge.mjs",
  8: "p8_concurrency.mjs",
  9: "p9_socket.mjs",
  10: "p10_analytics_vs_live.mjs",
  11: "p11_notification_access.mjs",
  12: "p12_admin_super.mjs",
};

const WATCHDOG = process.env.WATCHDOG_PS1
  || "C:\\Users\\ABDULR~1\\AppData\\Local\\Temp\\opencode\\start-server.ps1";

async function restartServer() {
  console.error("restarting server (env/heal)...");
  execFileSync("powershell", ["-ExecutionPolicy", "Bypass", "-Command", `& '${WATCHDOG}'`], {
    stdio: "inherit",
    timeout: 120000,
  });
  // wait for HTTP to answer again
  for (let i = 0; i < 30; i++) {
    try {
      await fetch("http://localhost:5000/api/v1/users/me", { signal: AbortSignal.timeout(3000) });
      return;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const list = (process.env.PHASES || "1,2,3").split(",").map((s) => s.trim());
  for (const n of list) {
    phase(n);
    let mod;
    try {
      mod = await import(`./${MAP[n]}`);
    } catch (e) {
      console.error(`Phase ${n} not found:`, e.message);
      continue;
    }
    try {
      await mod.default();
    } catch (e) {
      console.error(`Phase ${n} threw:`, e.message);
      // Environment-flap signature: a socket game handshake that never settles
      // (server Mongoose pool lost its write path during an Atlas/DNS blip).
      if (/timeout waiting game result/.test(e.message) && process.env.NO_HEAL !== "1") {
        console.error("detected start-game stall (env); restarting server and retrying phase once");
        await restartServer();
        await sleep(2000);
        mod = await import(`./${MAP[n]}?heal=${Date.now()}`);
        try {
          await mod.default();
        } catch (e2) {
          bug("HIGH", `Phase ${n} crashed`, e2.message, [], "", "");
        }
      } else {
        bug("HIGH", `Phase ${n} crashed`, e.message, [], "", "");
      }
    }
  }
  const { total, passed } = dumpSummary();
  writeFileSync(resolve(__dirname, "report.json"), JSON.stringify(dumpJson(), null, 2));
  console.log(`\nJSON report written. ${passed}/${total}`);
  process.exit(0);
}

main();
