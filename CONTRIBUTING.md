# Contributing to @chartxpert/sdk

Thank you for your interest in contributing! / شكرًا لاهتمامك بالمساهمة!

## Ways to contribute

- **Data adapters**: add a new free, key-less market-data source under `src/sources/`.
- **Translations**: improve the Arabic or English documentation.
- **Examples**: add a working example under `examples/` (React, Vue, plain HTML).
- **Bug reports**: open an Issue with a minimal reproduction.

Good first issues are labeled `good first issue` — a great place to start.

## Development setup

```bash
git clone https://github.com/chartxpert/sdk.git
cd sdk
npm install
npm run build
npm test
```

## Pull request rules

1. One change per PR. Keep diffs small and focused.
2. `npm run typecheck` and `npm test` must pass (CI enforces this).
3. Public API changes need a README update in the same PR.
4. Code and identifiers in English; documentation bilingual (AR + EN).
5. Never include proprietary engine code, internal architecture details, or
   third-party proprietary assets.

## Developer Certificate of Origin (DCO)

By submitting a pull request you certify that you wrote the contribution or
have the right to submit it under the Apache License 2.0, and that you agree
to the [Developer Certificate of Origin](https://developercertificate.org/).
Sign off your commits with:

```bash
git commit -s -m "your message"
```

## Code of Conduct

All participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities privately per [SECURITY.md](SECURITY.md) — never in a
public issue.
