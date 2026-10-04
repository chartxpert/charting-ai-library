import assert from "node:assert/strict";
import { test } from "node:test";

import type { Bar, ChartOptions } from "../types";

test("Bar shape is structurally valid", () => {
  const bar: Bar = { time: 1_700_000_000_000, open: 1, high: 2, low: 0.5, close: 1.5, volume: 10 };
  assert.ok(bar.high >= bar.low);
  assert.ok(bar.time > 0);
});

test("ChartOptions defaults are optional", () => {
  const opts: ChartOptions = {};
  assert.equal(opts.renderer, undefined);
  assert.equal(opts.locale, undefined);
});
