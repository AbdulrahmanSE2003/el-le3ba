import { api } from "./lib/http.mjs";
import { test } from "./lib/report.mjs";

// Uses seeded teamless students (student076-078) as throwaway accounts.
// Emails: student076@el-le3ba.test (creates team), 077 (joins), 078 (transfer/kick).
// After all ops, the team is deleted, restoring 076-078 to teamless state.

export default async function run() {
  // -- create team -> 201 with teamCode
  const t = await api("POST", "/teams", { body: { teamName: "IT Team A" }, label: "student076" });
  test("create team 201 + teamCode", t?.status === true && !!t?.team?.teamCode, JSON.stringify(t?.team?.teamCode));
  const teamId = t?.team?._id;

  // -- already in team -> 400
  const again = await api("POST", "/teams", { body: { teamName: "Again" }, label: "student076", raw: true });
  test("create team when already in team -> 400", again.status === 400, JSON.stringify(again.data?.message));

  // -- join team by code
  const joined = await api("POST", "/teams/join", { body: { teamCode: t.team.teamCode }, label: "student077" });
  test("join team by code 201", joined?.status === true && joined?.membership?.role === "member");

  // -- join wrong code -> 404
  const badCode = await api("POST", "/teams/join", { body: { teamCode: "ZZZZ0000" }, label: "student078", raw: true });
  test("join invalid code -> 404", badCode.status === 404);

  // -- join when already in team -> 400
  const joinedAgain = await api("POST", "/teams/join", { body: { teamCode: t.team.teamCode }, label: "student076", raw: true });
  test("join when already in team -> 400", joinedAgain.status === 400);

  // -- get my team stats returns avgScore
  const stats = await api("GET", "/teams/my-team/stats", { label: "student076" });
  test("team stats endpoint works", stats?.status === true && typeof stats?.teamStats?.totalGames === "number");

  // -- captain-only: member tries changeTeamName -> 404 (not a captain of any team)
  const memberRename = await api("PATCH", `/teams/${teamId}/name`, { body: { newTeamName: "Hacked" }, label: "student077", raw: true });
  test("member cannot rename -> 404", memberRename.status === 404, `status=${memberRename.status} ${JSON.stringify(memberRename.data?.message)}`);

  // -- captain renames own team
  const rename = await api("PATCH", `/teams/${teamId}/name`, { body: { newTeamName: "IT Team Alpha2" }, label: "student076", raw: true });
  test("captain rename 200", rename.status === 200, JSON.stringify(rename.data?.team?.teamName));

  // -- leave team (member student077)
  const leave = await api("DELETE", "/teams/leave", { label: "student077", raw: true });
  test("member leave 204", leave.status === 204);

  // -- captain changeCaptain: promote student078 (must join first)
  await api("POST", "/teams/join", { body: { teamCode: t.team.teamCode }, label: "student078" });
  const m78 = await api("GET", "/users/me", { label: "student078" });
  const c78 = m78.userData._id;
  const capChange = await api("PATCH", `/teams/${teamId}/captain`, { body: { newCaptainId: c78 }, label: "student076", raw: true });
  test("changeCaptain 200", capChange.status === 200, JSON.stringify(capChange.data?.team?.teamLeader));

  // -- new captain (078) kicks member 076 (now downgraded to member)? 076 is member now.
  const m76 = (await api("GET", "/users/me", { label: "student076" })).userData._id;
  const kick = await api("DELETE", `/teams/${teamId}/members/${m76}`, { label: "student078", raw: true });
  test("captain kick member 204", kick.status === 204);

  // -- kick yourself -> 400
  const selfKick = await api("DELETE", `/teams/${teamId}/members/${c78}`, { label: "student078", raw: true });
  test("kick self -> 400", selfKick.status === 400, JSON.stringify(selfKick.data?.message));

  // -- attempts endpoint requires eventId
  const noQ = await api("GET", "/teams/1/attempts", { label: "student078", raw: true });
  test("attempts missing eventId -> 400", noQ.status === 400, JSON.stringify(noQ.data?.message));

  // -- delete team (captain student078) -> 204, restores 076/078 to teamless
  const del = await api("DELETE", "/teams/my-team", { label: "student078", raw: true });
  test("captain delete team 204", del.status === 204);
}