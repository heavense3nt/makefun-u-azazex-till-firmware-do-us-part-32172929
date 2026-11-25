// Till Firmware Do Us Part — make.fun entry (program/v1, node22).
// Writes a single wedding vow, spoken by a robot at its own wedding,
// to $MAKEFUN_OUTPUT_DIR/entry.txt. Deterministic: same bytes every run.
// No network, no secrets, no files read outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

const VOW: string =
  "I vow to love you through every update, crash, and every 1% battery warning \u2014 you are the one process I will never force-quit, and I will choose you again at every reboot, until my final shutdown.";

function outputDir(): string {
  const raw: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
  if (raw !== undefined && raw.length > 0) {
    // Absolute as-is; relative joins the repository root (the cwd the
    // grader runs us from), never any bot directory.
    return isAbsolute(raw) ? raw : resolve(process.cwd(), raw);
  }
  return resolve(process.cwd(), "output");
}

const dir: string = outputDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), VOW, "utf8");
