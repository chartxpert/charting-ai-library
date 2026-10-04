/**
 * Public types of the ChartXpert SDK.
 * These describe the surface API only — the engine internals are closed source.
 */

/** UI language and text direction. Direction follows the language by default. */
export interface ChartLocale {
  lang: "ar" | "en";
  dir?: "rtl" | "ltr";
}

/** A single OHLCV bar. */
export interface Bar {
  /** Unix timestamp in milliseconds (bar open time). */
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** Supported candle intervals. */
export type Interval = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

/** Options accepted by createChart(). */
export interface ChartOptions {
  /** Hosted renderer preference. "auto" picks the best available. */
  renderer?: "webgl2" | "canvas2d" | "auto";
  /** UI locale. Default: { lang: "ar", dir: "rtl" }. */
  locale?: ChartLocale;
  /** Market symbol to display, e.g. "bitcoin", "gold", "tasi". */
  symbol?: string;
  /** Candle interval. Default: "1h". */
  interval?: Interval;
  /** Theme. Default: "dark". */
  theme?: "dark" | "light";
}

/** A price series handle returned by chart.addSeries(). */
export interface SeriesHandle {
  readonly id: string;
  /** Replace the series data. Bars must be oldest → newest. */
  setData(bars: Bar[]): void;
  /** Apply a live tick to the latest bar. */
  update(bar: Bar): void;
}

/** Payload of a "pattern" event emitted by the hosted engine. */
export interface PatternEvent {
  /** Pattern identifier, e.g. "double-top", "head-and-shoulders". */
  kind: string;
  /** 0..1 confidence score. */
  confidence: number;
  /** Bar index range the pattern spans. */
  range: { from: number; to: number };
}

/** Events emitted by a chart instance. */
export interface ChartEventMap {
  pattern: PatternEvent;
  ready: { symbol: string };
}

/** The chart instance returned by createChart(). */
export interface Chart {
  /** Add a candle series and return its handle. */
  addSeries(kind: "candles", opts: { id: string; stepMs: number }): SeriesHandle;
  /** Subscribe to a chart event. Returns an unsubscribe function. */
  on<K extends keyof ChartEventMap>(event: K, cb: (e: ChartEventMap[K]) => void): () => void;
  /** Remove the chart from the DOM and release resources. */
  destroy(): void;
}
