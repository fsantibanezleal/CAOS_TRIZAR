# Trizar — 3D Crusher-Physics Studio

> Set eccentric speed, throw, closed-side-setting (CSS) and feed size distribution on a cone, jaw or gyratory
> crusher and watch the product gradation, throughput and power form — and understand *why*. A didactic
> comminution sandbox, not a plant control system. Part of the **Faena** mining-analytics hub.

Live: **https://trizar.fasl-work.com** (after first deploy)

## What it is

Trizar couples three cited comminution models, all running **live in pure TypeScript**:

- **Whiten classification–breakage** population balance — product `p = (I − C)(I − B·C)⁻¹·f`, with the breakage
  matrix `B` built from the JKMRC **t10** energy→fineness curve and the **Austin** appearance function.
- **Evertsson** flow-capacity model — the unimodal capacity hump vs eccentric speed.
- **Bond** power.

On top, two **learned ONNX models** run in-browser (trained offline on the population-balance engine): a
population-balance **surrogate MLP** for instant what-ifs and a **denoising autoencoder** operating-anomaly score
that also flags when the surrogate is extrapolating. The 3D view replays **DEM** particle traces precomputed
offline (industrial DEM is infeasible in a browser).

## Architecture (deterministic-replay)

```
OFFLINE (.venv, Python)                         LIVE (browser, TypeScript)
  coarse-grained DEM (seeded, section)            Whiten + Evertsson + Bond engine  (pure TS, <1 ms)
  Latin-hypercube sweep → train ONNX              onnxruntime-web  (surrogate + autoencoder)
        │  commits                                three.js  (replay of the pre-baked DEM trace)
        ▼                                         zustand store → ~12 reactive views
  cz-*.bin traces · *.onnx · *.json  ──(git)──▶
```

Heavy DEM never runs client-side; the browser replays seeded, decimated traces (<1 MB each) and runs only the
small live physics + ONNX inference.

## Develop

```bash
npm install
npm run dev       # vite dev server
npm test          # physics invariant tests (node --test)
npm run build     # tsc --noEmit && vite build  (+ SPA 404.html)
```

The offline pipeline lives in `tools/` (its own `.venv`, never committed; raw DEM exports are gitignored). The
committed artifacts under `public/` are the reproducible, seeded outputs.

## Honesty

The K1/K2/K3 classification constants and the operating-energy coupling are **illustrative** — they reproduce the
correct trends (CSS↓ ⇒ finer product; the capacity hump), not a specific plant's absolute numbers, pending
calibration to open industrial data (Duarte et al. 2021, CC-BY). Synthetic numbers are labelled as such; no
benchmark numbers are fabricated.

## License

Source-available for review. © Felipe Santibáñez-Leal.
