import { api, setToken, getToken } from "./lib/http.mjs";

const PW = "password123";

// Log in exactly the accounts needed and cache tokens.
// The auth limiter shares one 10-req/15-min budget across login+signup,
// so preseed must stay <= 10 logins per server window. Re-run after a
// server restart to fill remaining accounts across windows.
const ACCOUNTS = [
  ["superAdmin", "superadmin@el-le3ba.test"],
  ["admin1", "admin1@el-le3ba.test"],
  ["cap1", "student001@el-le3ba.test"], // Alpha captain
  ["cap2", "student002@el-le3ba.test"], // Bravo captain
  ["member16", "student016@el-le3ba.test"], // Alpha member
  ["student076", "student076@el-le3ba.test"], // teamless + phase-2 creator
  ["student077", "student077@el-le3ba.test"], // phase-2 member
  ["student078", "student078@el-le3ba.test"], // phase-2 transfer target
  ["member17", "student017@el-le3ba.test"], // Bravo member
  ["admin2", "admin2@el-le3ba.test"],
  ["cap3", "student003@el-le3ba.test"], // Charlie captain (p3/p6 session team)
  ["member18", "student018@el-le3ba.test"], // Charlie member
  ["cap4", "student004@el-le3ba.test"], // Delta captain (p6 finalize)
  ["member19", "student019@el-le3ba.test"], // Delta member
  ["cap5", "student005@el-le3ba.test"], // Echo captain (p7 edge)
  ["member20", "student020@el-le3ba.test"], // Echo member
  ["cap6", "student006@el-le3ba.test"], // Foxtrot captain (p8 concurrency)
  ["member21", "student021@el-le3ba.test"], // Foxtrot member
];

for (const [label, email] of ACCOUNTS) {
  if (getToken(label)) continue;
  const d = await api("POST", "/users/login", { body: { email, password: PW } });
if (d?.status === true && d?.auth?.token) {
      setToken(label, d.auth.token);
      console.log(`preseed: ${label} OK (${d.auth.user.role})`);
      // student076 doubles as the teamless probe account; reuse the token (no extra login).
      if (label === "student076" && !getToken("teamless")) setToken("teamless", d.auth.token);
    } else {
    console.log(`preseed: ${label} FAILED`, JSON.stringify(d?.message || d));
  }
}
console.log("preseed done");

export default async function run() {}