// The case matrix — ~a dozen distinct, fully-configurable operating scenarios + two controls (manifest
// §caseMatrix). Each case is a complete Operating point; the workbench loads one and every view reacts. The
// sliders then let the user move freely off the preset. C12 (pass-through) and C13 (CSS>F80) are deliberate
// negative/invalid controls — the engine must show ~zero reduction / flag invalidity, not a pretty plot.

import type { Operating } from '../physics/types';

export interface Case extends Operating {
  id: string;
  name: string;
  blurb: string;
  control?: 'negative' | 'invalid' | 'calibration';
}

export const CASES: Case[] = [
  { id: 'C01', name: 'Cone secondary · medium · choke', blurb: 'Well-graded choke feed at the capacity optimum — the reference operating point.', machine: 'cone-sec', cssMm: 32, throwMm: 30, speedRpm: 360, feedX63Mm: 90, feedM: 1.2, oreAxb: 55, oreWi: 14 },
  { id: 'C02', name: 'Cone secondary · soft · coarse', blurb: 'Soft ore, coarse feed, open setting, below-optimum speed.', machine: 'cone-sec', cssMm: 40, throwMm: 32, speedRpm: 300, feedX63Mm: 120, feedM: 1.0, oreAxb: 80, oreWi: 11 },
  { id: 'C03', name: 'Cone secondary · hard · over-speed', blurb: 'Hard ore, coarse feed, wide setting, above-optimum speed (past the capacity hump).', machine: 'cone-sec', cssMm: 50, throwMm: 30, speedRpm: 470, feedX63Mm: 130, feedM: 1.0, oreAxb: 38, oreWi: 17 },
  { id: 'C04', name: 'Cone secondary · fines-heavy', blurb: 'Fines-heavy feed, tight setting — high reduction, fine product.', machine: 'cone-sec', cssMm: 16, throwMm: 26, speedRpm: 360, feedX63Mm: 55, feedM: 1.6, oreAxb: 55, oreWi: 14 },
  { id: 'C05', name: 'Cone secondary · hard · RoM', blurb: 'Hard ore, run-of-mine feed, wide setting at the optimum.', machine: 'cone-sec', cssMm: 80, throwMm: 36, speedRpm: 360, feedX63Mm: 180, feedM: 0.9, oreAxb: 40, oreWi: 16 },
  { id: 'C06', name: 'Cone secondary · soft · fine product', blurb: 'Soft ore, very tight setting — a fine product at the optimum.', machine: 'cone-sec', cssMm: 8, throwMm: 22, speedRpm: 360, feedX63Mm: 45, feedM: 1.3, oreAxb: 80, oreWi: 11 },
  { id: 'C07', name: 'Cone secondary · trickle-fed', blurb: 'Tight setting, trickle (single-particle) feeding — low fill, near-CSS product.', machine: 'cone-sec', cssMm: 12, throwMm: 22, speedRpm: 360, feedX63Mm: 60, feedM: 1.2, oreAxb: 55, oreWi: 14 },
  { id: 'C08', name: 'Cone secondary · hard · over-speed II', blurb: 'Hard ore, mid setting, well above optimum — capacity falls, power high.', machine: 'cone-sec', cssMm: 40, throwMm: 30, speedRpm: 520, feedX63Mm: 130, feedM: 1.0, oreAxb: 38, oreWi: 17 },
  { id: 'C09', name: 'Cone tertiary · fines', blurb: 'Tertiary crusher, fine feed, tight setting at its higher optimum speed.', machine: 'cone-tert', cssMm: 8, throwMm: 16, speedRpm: 400, feedX63Mm: 28, feedM: 1.5, oreAxb: 55, oreWi: 14 },
  { id: 'C10', name: 'Jaw primary · hard · RoM', blurb: 'Primary jaw, hard ore, run-of-mine feed, wide setting (crank-rocker ellipse).', machine: 'jaw', cssMm: 125, throwMm: 40, speedRpm: 300, feedX63Mm: 400, feedM: 0.9, oreAxb: 42, oreWi: 16 },
  { id: 'C11', name: 'Jaw primary · trickle', blurb: 'Primary jaw, medium ore, coarse feed, trickle-fed.', machine: 'jaw', cssMm: 80, throwMm: 36, speedRpm: 280, feedX63Mm: 300, feedM: 1.0, oreAxb: 55, oreWi: 14 },
  { id: 'C12', name: 'Pass-through (negative control)', blurb: 'CSS wider than F80 — material passes mostly ungripped. The engine must show ≈zero reduction, not a pretty plot, and flag the pass-through regime.', machine: 'cone-sec', cssMm: 160, throwMm: 30, speedRpm: 360, feedX63Mm: 90, feedM: 1.2, oreAxb: 55, oreWi: 14, control: 'negative' },
  { id: 'C13', name: 'CSS > feed top (invalid control)', blurb: 'CSS wider than the feed top size — physically meaningless. The engine must FLAG invalidity (conditioning / mass-closure / non-negativity guard), never render silent garbage.', machine: 'cone-sec', cssMm: 280, throwMm: 30, speedRpm: 360, feedX63Mm: 90, feedM: 1.2, oreAxb: 55, oreWi: 14, control: 'invalid' },
  { id: 'C14', name: 'Calibration anchor (HP-class cone)', blurb: 'Operating point matched to published industrial cone data (Duarte et al. 2021) for absolute-number calibration; kept disjoint from any held-out validation point.', machine: 'cone-sec', cssMm: 25, throwMm: 30, speedRpm: 350, feedX63Mm: 80, feedM: 1.15, oreAxb: 52, oreWi: 15, control: 'calibration' },
];

export const DEFAULT_CASE = CASES[0];
