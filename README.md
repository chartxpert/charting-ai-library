# @chartxpert/sdk

[English](#english) | [العربية](#العربية)

[![npm](https://img.shields.io/npm/v/@chartxpert/sdk)](https://www.npmjs.com/package/@chartxpert/sdk)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)

---

## العربية

الحزمة الرسمية لدمج شارتات **ChartXpert** في موقعك أو تطبيقك، مع محوّلات بيانات مجانية جاهزة. واجهة عربية/إنجليزية ثنائية الاتجاه، وتغطية للعملات الرقمية والأسهم السعودية والأمريكية والعملات والذهب والنفط.

> ملاحظة: محرك الرسم نفسه مغلق المصدر ومملوك لشركة Difins Co. هذه الحزمة هي طبقة التكامل المدعومة رسميًا.

### التثبيت

```bash
npm install @chartxpert/sdk
```

### الاستخدام

```ts
import { createChart } from "@chartxpert/sdk";

const chart = await createChart("#host", {
  locale: { lang: "ar", dir: "rtl" },
  symbol: "bitcoin",
  interval: "1h",
});

chart.on("pattern", (e) => console.log(e.kind, e.confidence, e.range));
```

### محوّلات البيانات المجانية

```ts
import { binanceKlines, krakenOhlc } from "@chartxpert/sdk/sources";

const bars = await binanceKlines("BTCUSDT", "1h", 500);
```

### المساهمة

نرحّب بالمساهمات! اقرأ [CONTRIBUTING.md](CONTRIBUTING.md) ثم افتح Issue أو Pull Request.

---

## English

The official SDK for embedding **ChartXpert** live financial charts into your site or app, with ready-made free data adapters. Full Arabic/English bidirectional UI, covering crypto, Saudi and US stocks, FX, gold, and oil.

> Note: the rendering engine itself is closed source and owned by Difins Co. This package is the officially supported integration layer.

### Install

```bash
npm install @chartxpert/sdk
```

### Usage

```ts
import { createChart } from "@chartxpert/sdk";

const chart = await createChart("#host", {
  locale: { lang: "en" },
  symbol: "gold",
  interval: "4h",
});

chart.on("pattern", (e) => console.log(e.kind, e.confidence, e.range));
```

### Free data adapters

```ts
import { binanceKlines, krakenOhlc } from "@chartxpert/sdk/sources";

const bars = await binanceKlines("BTCUSDT", "1h", 500);
```

### Contributing

Contributions are welcome! Read [CONTRIBUTING.md](CONTRIBUTING.md), then open an Issue or a Pull Request.

---

© 2026 Difins Co. — https://difins.co · https://chartxpert.ai
