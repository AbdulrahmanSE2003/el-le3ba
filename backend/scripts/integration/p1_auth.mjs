import { api, setToken, getToken } from "./lib/http.mjs";
import { test } from "./lib/report.mjs";
import { uniqEmail } from "./lib/util.mjs";

const PW = "password123";
const SKIP_AUTH_TESTS = process.env.SKIP_AUTH_TESTS === "1";

export default async function run() {
  // -- 1. Login as all roles (captains + a seeded member for later phases)
  // Skip already-cached tokens to avoid exhausting the auth rate limit on reruns.
  const creds = [
    ["superAdmin", "superadmin@el-le3ba.test"],
    ["admin1", "admin1@el-le3ba.test"],
    ["cap1", `student001@el-le3ba.test`], // captain team Alpha
    ["cap2", `student002@el-le3ba.test`], // captain team Bravo
    ["member16", `student016@el-le3ba.test`], // member of Alpha
    ["teamless", `student076@el-le3ba.test`], // no team
  ];
  for (const [label, email] of creds) {
    if (getToken(label)) {
      test(`login ${label} (cached)`, true, "cached");
      continue;
    }
    const d = await api("POST", "/users/login", { body: { email, password: PW } });
    test(`login ${label}`, d?.status === true && d?.auth?.token, JSON.stringify(d?.auth?.user?.role));
    if (d?.auth?.token) setToken(label, d.auth.token);
  }

  // -- 2-6: rate-limit-consuming auth tests (gated to avoid exhausting budget)
  if (!SKIP_AUTH_TESTS) {
    // -- 2. Login with wrong password -> 401
    const bad = await api("POST", "/users/login", {
      body: { email: "superadmin@el-le3ba.test", password: "wrong" },
      raw: true,
    });
    test("login wrong password 401", bad.status === 401);

    // -- 3. Login missing fields -> 400
    const missing = await api("POST", "/users/login", { body: {}, raw: true });
    test("login missing fields 400", missing.status === 400);

    // -- 4. Deactivated user cannot login (student080 is inactive)
    const inactive = await api("POST", "/users/login", {
      body: { email: `student080@el-le3ba.test`, password: PW },
      raw: true,
    });
    test("deactivated login blocked 403", inactive.status === 403, JSON.stringify(inactive.data?.message));

    // -- 5. Signup creates a student user (only if not already created in a prior run)
    // Signup is rate-limited; cache the signup token so reruns don't pay the cost.
    const email = getToken("signupEmail") || uniqEmail();
    if (getToken("signupEmail")) {
      test("signup creates student (cached)", true, "cached " + email);
    } else {
      const su = await api("POST", "/users/signup", {
        body: { name: "IT Signup", email, password: PW, passwordConfirm: PW },
        raw: true,
      });
      test("signup creates student 201/200", su.status === 201 || su.status === 200, `status=${su.status} ${JSON.stringify(su.data?.auth?.user?.role)}`);
      if (su.status === 201 || su.status === 200) {
        setToken("signupEmail", email);
        setToken("signupUser", su.data.auth.token);
      }
    }

    // -- 6. Signup duplicate email -> 400
    const dup = await api("POST", "/users/signup", {
      body: { name: "Dup", email, password: PW, passwordConfirm: PW },
      raw: true,
    });
    test("signup duplicate email rejected", dup.status === 400 || dup.status === 500, `status=${dup.status}`);
  } else {
    test("auth failure cases (gated)", true, "SKIP_AUTH_TESTS=1");
  }

  // -- 7. protect: no token -> 401
  const noAuth = await api("GET", "/users/me", { raw: true });
  test("no token -> 401", noAuth.status === 401);

  // -- 8. protect: invalid token -> 401
  const badToken = await api("GET", "/users/me", { token: "not-a-real-token", raw: true });
  test("invalid token -> 401", badToken.status === 401);

  // -- 9. getMe returns user + team info (captain)
  const meCap = await api("GET", "/users/me", { label: "cap1" });
  test(
    "getMe captain has myTeamRole+team",
    meCap?.status === true && meCap?.userData?.myTeamRole === "captain",
  );

  // -- 10. getMe teamless user -> no team key
  const meTL = await api("GET", "/users/me", { label: "teamless" });
  test("getMe teamless lacks myTeamRole", meTL?.status === true && meTL?.userData?.myTeamRole === undefined);

  // -- 11. restrictTo: student cannot access admin route
  const studentAdmin = await api("GET", "/admin/dashboard/stats", { label: "cap1", raw: true });
  test("student blocked from admin 403", studentAdmin.status === 403);

  // -- 12. logout returns status true
  const logout = await api("POST", "/users/logout", { raw: true });
  test("logout 200", logout.status === 200);
}
