export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function pad(n, w = 4) {
  return String(n).padStart(w, "0");
}

let uniqCounter = 0;
export function uniqEmail(prefix = "it") {
  uniqCounter += 1;
  return `${prefix}${Date.now()}${uniqCounter}@el-le3ba.test`;
}

export function ok(cond, msg) {
  if (!cond) throw new Error(msg);
}
