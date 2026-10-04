/**
 * @chartxpert/sdk — public SDK surface.
 *
 * createChart() embeds the hosted ChartXpert chart (served from chartxpert.ai)
 * inside your page through a sandboxed iframe, and exposes a typed event and
 * data API on top of postMessage. The rendering engine itself is closed
 * source; this package is the supported integration layer.
 */

import type { Bar, Chart, ChartEventMap, ChartOptions, SeriesHandle } from "./types";

const DEFAULT_BASE = "https://chartxpert.ai";

interface EmbedMessage {
  source?: string;
  type?: string;
  payload?: unknown;
}

export async function createChart(
  host: string | HTMLElement,
  options: ChartOptions = {},
): Promise<Chart> {
  if (typeof document === "undefined") {
    throw new Error("createChart() requires a browser environment");
  }

  const el = typeof host === "string" ? document.querySelector<HTMLElement>(host) : host;
  if (!el) throw new Error(`createChart(): host element not found (${String(host)})`);

  const locale = options.locale ?? { lang: "ar", dir: "rtl" };
  const params = new URLSearchParams({
    embed: "1",
    lang: locale.lang,
    theme: options.theme ?? "dark",
    symbol: options.symbol ?? "bitcoin",
    interval: options.interval ?? "1h",
  });

  const iframe = document.createElement("iframe");
  iframe.src = `${DEFAULT_BASE}/chart?${params.toString()}`;
  iframe.style.border = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("title", "ChartXpert chart");
  el.appendChild(iframe);

  const listeners = new Map<string, Set<(e: never) => void>>();

  const onMessage = (ev: MessageEvent) => {
    if (ev.origin !== DEFAULT_BASE) return;
    const msg = ev.data as EmbedMessage;
    if (msg?.source !== "chartxpert" || !msg.type) return;
    const set = listeners.get(msg.type);
    if (set) for (const cb of set) cb(msg.payload as never);
  };
  window.addEventListener("message", onMessage);

  await new Promise<void>((resolve) => {
    iframe.addEventListener("load", () => resolve(), { once: true });
  });

  const post = (type: string, payload: unknown) => {
    iframe.contentWindow?.postMessage({ source: "chartxpert-sdk", type, payload }, DEFAULT_BASE);
  };

  const chart: Chart = {
    addSeries(_kind, opts): SeriesHandle {
      return {
        id: opts.id,
        setData(bars: Bar[]) {
          post("series:setData", { id: opts.id, bars });
        },
        update(bar: Bar) {
          post("series:update", { id: opts.id, bar });
        },
      };
    },
    on<K extends keyof ChartEventMap>(event: K, cb: (e: ChartEventMap[K]) => void) {
      let set = listeners.get(event);
      if (!set) {
        set = new Set();
        listeners.set(event, set);
      }
      set.add(cb as (e: never) => void);
      return () => set?.delete(cb as (e: never) => void);
    },
    destroy() {
      window.removeEventListener("message", onMessage);
      iframe.remove();
      listeners.clear();
    },
  };

  return chart;
}

export type { Bar, Chart, ChartEventMap, ChartLocale, ChartOptions, Interval, PatternEvent, SeriesHandle } from "./types";
