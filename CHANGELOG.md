# Changelog

All notable changes to Trizar (ChancaDEM) are documented here. Versions follow `MAJOR.MINOR.PATCH` as
`X.XX.XXX`. The project stays on `0.x` while the physics constants are illustrative / pending calibration to
open industrial data.

## [0.01.000] — 2026-06-20

Initial scaffold + live physics core.

### Added
- Project scaffold on the proven shared stack (Vite + React 19 + TS, `@fasl-work/caos-app-shell`, uPlot, three,
  onnxruntime-web, zustand) with the six standard pages and SPA 404 fallback.
- **Live pure-TypeScript crusher-physics engine**: the Whiten classification–breakage population balance
  `p = (I − C)(I − B·C)⁻¹·f`, the JKMRC t10 → Austin appearance function for the breakage matrix B, the Evertsson
  reduced-form capacity hump, and Bond power. Sub-millisecond, no Pyodide.
- 10 invariant unit tests (mass closure, monotone classification, strictly-lower breakage with column-conserved
  mass, CSS↓⇒finer, the capacity hump, pass-through / invalid guards).
- 14-case matrix (cone secondary/tertiary + jaw, hardness/feed/regime spread) including a pass-through negative
  control and a CSS>F80 invalid control.
- Initial App workbench wired to the engine (case + sliders → live KPIs + feed-vs-product gradation + decision/
  validity card) and the six documentation pages (Methodology carries the full model equations).
- DOI-verified citation ledger (the adversarial research pass corrected several venues/DOIs and removed a
  phantom-author reference).

### Pending (next build stages)
- Offline `.venv` pipeline: coarse-grained reduced-N DEM tracer traces + the Latin-hypercube sweep over the
  population-balance engine.
- The two learned ONNX models (population-balance surrogate MLP + denoising-autoencoder anomaly score) + held-out
  metrics + the PyTorch↔onnxruntime-web parity test.
- The full multi-tab runtime (3D chamber replay, capacity envelope, surrogate what-if, anomaly score, operating-
  map heatmap, …) and the deepened Experiments/Benchmark pages with real plotted results.
