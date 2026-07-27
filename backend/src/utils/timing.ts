import mongoose from "mongoose";

export type TimingAccumulator = { steps: { label: string; ms: number }[] };

const ENABLED = process.env.DEBUG_TIMING !== "false";

const READY_LABELS: Record<number, string> = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

/**
 * Wrap an async operation with timing instrumentation.
 * Accumulates the duration into `acc.steps` for later logging.
 * No-op when DEBUG_TIMING is "false".
 */
export async function timed<T>(
  label: string,
  fn: () => Promise<T>,
  acc: TimingAccumulator,
): Promise<T> {
  if (!ENABLED) return fn();
  const start = process.hrtime.bigint();
  try {
    return await fn();
  } finally {
    const end = process.hrtime.bigint();
    acc.steps.push({ label, ms: Number(end - start) / 1e6 });
  }
}

/**
 * Log the accumulated timing data as a single structured line.
 * Includes the MongoDB connection state at the time of logging.
 */
export function logTiming(acc: TimingAccumulator): void {
  if (!ENABLED || acc.steps.length === 0) return;
  const totalMs = acc.steps.reduce((sum, s) => sum + s.ms, 0);
  const readyState = mongoose.connection.readyState;
  const readyLabel = READY_LABELS[readyState] ?? `unknown(${readyState})`;
  const parts = acc.steps
    .map((s) => `${s.label}=${s.ms.toFixed(1)}ms`)
    .join(" ");
  console.log(
    `[timing] submitAnswer readyState=${readyLabel} total=${totalMs.toFixed(0)}ms ${parts}`,
  );
}
