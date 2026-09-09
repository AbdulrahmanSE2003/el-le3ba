const results = {
  phases: [],
  bugs: [],
  notes: [],
};

export function phase(name) {
  results.phases.push({ name, tests: [] });
}

export function test(name, pass, detail = "") {
  const p = results.phases[results.phases.length - 1];
  p.tests.push({ name, pass: !!pass, detail });
  // console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
}

export function bug(severity, title, repro, files, rootCause, fix, mismatch = false) {
  results.bugs.push({
    severity,
    title,
    repro,
    files,
    rootCause,
    fix,
    mismatch,
  });
}

export function note(msg) {
  results.notes.push(msg);
}

export function dumpSummary() {
  let total = 0;
  let passed = 0;
  for (const p of results.phases) {
    total += p.tests.length;
    passed += p.tests.filter((t) => t.pass).length;
    console.log(`PHASE ${p.name}: ${p.tests.filter((t) => t.pass).length}/${p.tests.length} passed`);
    for (const t of p.tests) {
      if (!t.pass) console.log(`    FAIL: ${t.name}${t.detail ? " — " + t.detail : ""}`);
    }
  }
  console.log(`\nTOTAL: ${passed}/${total}`);
  return { total, passed, results };
}

export function dumpJson() {
  return results;
}
