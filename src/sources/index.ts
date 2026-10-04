/**
 * Free, key-less market-data adapters.
 *
 * Each adapter normalizes a public vendor REST endpoint into the SDK's Bar
 * shape (oldest → newest). These are examples and starting points — rate
 * limits and availability belong to the vendors.
 */

import type { Bar, Interval } from "../types";

const INTERVAL_MS: Record<Interval, number> = {
  "1m": 60_000,
  "5m": 300_000,
  "15m": 900_000,
  "1h": 3_600_000,
  "4h": 14_400_000,
  "1d": 86_400_000,
};

async function getJson(url: string, timeoutMs = 6_000): Promise<unknown> {
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`upstream ${res.status}`);
  return res.json() as Promise<unknown>;
}

function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

/** Binance spot klines, e.g. binanceKlines("BTCUSDT", "1h", 500). */
export async function binanceKlines(symbol: string, interval: Interval, limit = 500): Promise<Bar[]> {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${Math.min(limit, 1000)}`;
  const rows = (await getJson(url)) as unknown[][];
  return rows.map((r) => ({
    time: num(r[0]),
    open: num(r[1]),
    high: num(r[2]),
    low: num(r[3]),
    close: num(r[4]),
    volume: num(r[5]),
  }));
}

/** Kraken OHLC, e.g. krakenOhlc("XBTUSD", "1h"). */
export async function krakenOhlc(pair: string, interval: Interval): Promise<Bar[]> {
  const minutes = INTERVAL_MS[interval] / 60_000;
  const url = `https://api.kraken.com/0/public/OHLC?pair=${pair}&interval=${minutes}`;
  const data = (await getJson(url)) as { result?: Record<string, unknown[][]> };
  const key = Object.keys(data.result ?? {}).find((k) => k !== "last");
  const rows = key ? (data.result?.[key] ?? []) : [];
  return rows.map((r) => ({
    time: num(r[0]) * 1000,
    open: num(r[1]),
    high: num(r[2]),
    low: num(r[3]),
    close: num(r[4]),
    volume: num(r[6]),
  }));
}
