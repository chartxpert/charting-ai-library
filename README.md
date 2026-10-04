<div align="center">

# ChartXpert Charting AI Library

**The official integration layer for AI-powered financial charts — by Difins Co.**

**المكتبة الرسمية لدمج الشارتات المالية المدعومة بالذكاء الاصطناعي — من Difins Co.**

[![npm](https://img.shields.io/npm/v/@chartxpert/charting-ai-library?color=d4a72c&label=npm)](https://www.npmjs.com/package/@chartxpert/charting-ai-library)
[![License](https://img.shields.io/badge/license-Apache%202.0-d4a72c)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](tsconfig.json)
[![RTL](https://img.shields.io/badge/Arabic-RTL%20native-0f172a)](#)

[Website](https://chartxpert.ai) · [Developers](https://chartxpert.ai/developers) · [Live Markets](https://chartxpert.ai/markets) · [Support](mailto:support@chartxpert.io)

[English](#english) · [العربية](#العربية)

</div>

---

## English

### Overview

ChartXpert Charting AI Library lets product teams embed live, AI-assisted financial charts into any web application with a small, fully typed API. It covers crypto, Saudi (Tadawul) and US equities, FX, gold and oil, and is built Arabic-first with native right-to-left support.

The library is the **officially supported, open-source integration layer**. The rendering and AI engine runs on ChartXpert's hosted infrastructure and remains proprietary to Difins Co.

### Key capabilities

| Capability | Description |
| --- | --- |
| **AI pattern events** | Subscribe to detected chart patterns with confidence scores and bar ranges. |
| **Bilingual by design** | Arabic (RTL) and English (LTR) UI from a single option. |
| **Multi-asset coverage** | Crypto, Tadawul, US stocks, FX, and commodities. |
| **Typed API** | Strict TypeScript definitions for every public surface. |
| **Free data adapters** | Key-less adapters that normalize public market data into one bar format. |
| **Lightweight** | ESM-only, zero runtime dependencies. |

### Installation

```bash
npm install @chartxpert/charting-ai-library
```

### Quick start

```ts
import { createChart } from "@chartxpert/charting-ai-library";

const chart = await createChart("#chart", {
  locale: { lang: "en" },
  symbol: "gold",
  interval: "4h",
  theme: "dark",
});

chart.on("pattern", (e) => {
  console.log(e.kind, e.confidence, e.range);
});
```

### Data adapters

```ts
import { binanceKlines, krakenOhlc } from "@chartxpert/charting-ai-library/sources";

const bars = await binanceKlines("BTCUSDT", "1h", 500);
```

### API reference

| Member | Purpose |
| --- | --- |
| `createChart(host, options)` | Mounts a chart into an element or selector and resolves to a `Chart`. |
| `chart.addSeries("candles", { id, stepMs })` | Adds a candle series and returns a `SeriesHandle`. |
| `series.setData(bars)` / `series.update(bar)` | Replaces history or applies a live tick. |
| `chart.on(event, callback)` | Subscribes to `pattern` or `ready`; returns an unsubscribe function. |
| `chart.destroy()` | Removes the chart and releases resources. |

### Market data notice

Equity, FX, and commodity prices from free sources may be delayed by up to 15 minutes. The library is a charting tool and does not constitute investment advice.

### Contributing

We welcome contributions — new data adapters, examples, translations, and fixes. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md). Security issues must be reported privately per [SECURITY.md](SECURITY.md).

---

## العربية

### نظرة عامة

تتيح مكتبة **ChartXpert Charting AI Library** لفرق المنتجات دمج شارتات مالية حية مدعومة بالذكاء الاصطناعي في أي تطبيق ويب، عبر واجهة برمجية صغيرة ومكتوبة بالكامل بـ TypeScript. تغطي العملات الرقمية، والأسهم السعودية (تداول) والأمريكية، والعملات، والذهب والنفط، وصُممت للعربية أولًا مع دعم أصيل للاتجاه من اليمين إلى اليسار.

المكتبة هي **طبقة التكامل الرسمية مفتوحة المصدر**، أما محرك الرسم والذكاء الاصطناعي فيعمل على بنية ChartXpert المستضافة ويبقى ملكية خاصة لشركة Difins Co.

### القدرات الرئيسية

| القدرة | الوصف |
| --- | --- |
| **أحداث الأنماط الذكية** | استقبل الأنماط المكتشفة مع درجة الثقة ونطاق الشموع. |
| **ثنائية اللغة** | واجهة عربية (RTL) وإنجليزية (LTR) بخيار واحد. |
| **تغطية متعددة الأسواق** | كريبتو، تداول، الأسهم الأمريكية، العملات، والسلع. |
| **واجهة مكتوبة الأنواع** | تعريفات TypeScript صارمة لكل واجهة عامة. |
| **محوّلات بيانات مجانية** | محوّلات بلا مفاتيح توحّد بيانات السوق العامة في صيغة واحدة. |
| **خفيفة** | ESM فقط، بلا اعتماديات تشغيلية. |

### التثبيت

```bash
npm install @chartxpert/charting-ai-library
```

### البدء السريع

```ts
import { createChart } from "@chartxpert/charting-ai-library";

const chart = await createChart("#chart", {
  locale: { lang: "ar", dir: "rtl" },
  symbol: "tasi",
  interval: "1d",
});

chart.on("pattern", (e) => console.log(e.kind, e.confidence));
```

### تنبيه بيانات السوق

قد تتأخر أسعار الأسهم والعملات والسلع من المصادر المجانية حتى 15 دقيقة. المكتبة أداة رسم بياني ولا تمثل نصيحة استثمارية.

### المساهمة

نرحّب بمساهماتكم: محوّلات بيانات جديدة، أمثلة، ترجمات، وإصلاحات. اقرأ [دليل المساهمة](CONTRIBUTING.md) و[مدونة السلوك](CODE_OF_CONDUCT.md)، وأبلغ عن الثغرات الأمنية بشكل خاص وفق [سياسة الأمان](SECURITY.md).

---

<div align="center">

**ChartXpert AI** is a trademark of **Difins Co.**
© 2026 Difins Co. All rights reserved. The library source is licensed under [Apache 2.0](LICENSE).

[difins.co](https://difins.co) · [chartxpert.ai](https://chartxpert.ai) · [chartxpert.io](https://chartxpert.io)

</div>
