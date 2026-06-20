// The single workbench store. A case preset or any slider writes the Operating point; `result` is the live
// engine evaluation every view reads. Pure + synchronous — the engine is sub-millisecond, so we recompute on
// each change rather than memoizing across the tree.
import { create } from 'zustand';
import { evaluate } from '../physics/engine';
import { CASES, DEFAULT_CASE, type Case } from '../data/cases';
import type { Operating, CrusherResult } from '../physics/types';

const opOf = (c: Case): Operating => ({
  machine: c.machine, cssMm: c.cssMm, throwMm: c.throwMm, speedRpm: c.speedRpm,
  feedX63Mm: c.feedX63Mm, feedM: c.feedM, oreAxb: c.oreAxb, oreWi: c.oreWi,
});

interface WorkbenchState {
  caseId: string;
  op: Operating;
  result: CrusherResult;
  setCase: (id: string) => void;
  patch: (p: Partial<Operating>) => void;
  reset: () => void;
}

export const useWorkbench = create<WorkbenchState>((set) => ({
  caseId: DEFAULT_CASE.id,
  op: opOf(DEFAULT_CASE),
  result: evaluate(opOf(DEFAULT_CASE)),
  setCase: (id) => {
    const c = CASES.find((x) => x.id === id) ?? DEFAULT_CASE;
    const op = opOf(c);
    set({ caseId: c.id, op, result: evaluate(op) });
  },
  patch: (p) => set((s) => { const op = { ...s.op, ...p }; return { op, result: evaluate(op) }; }),
  reset: () => { const op = opOf(DEFAULT_CASE); set({ caseId: DEFAULT_CASE.id, op, result: evaluate(op) }); },
}));
