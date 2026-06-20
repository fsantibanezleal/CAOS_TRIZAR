import { useShellLang } from '@fasl-work/caos-app-shell';
import { useWorkbench } from '../state/store';
import { CASES } from '../data/cases';
import { PsdChart } from '../viz/PsdChart';
import type { Machine } from '../physics/types';

// The App workbench. A case preset + free sliders drive the live pure-TS crusher engine; the KPI strip, the
// feed-vs-product gradation and the decision/validity card all react instantly. The full multi-tab view set
// (3D chamber replay, capacity envelope, surrogate what-if, anomaly score, operating-map heatmap …) is added
// on top of this same store in the build's runtime stage.

const MACHINES: { id: Machine; en: string; es: string }[] = [
  { id: 'cone-sec', en: 'Cone · secondary', es: 'Cono · secundario' },
  { id: 'cone-tert', en: 'Cone · tertiary', es: 'Cono · terciario' },
  { id: 'jaw', en: 'Jaw · primary', es: 'Mandíbula · primaria' },
];

function Slider({ label, unit, value, min, max, step, onChange }: { label: string; unit: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <label className="tz-ctl">
      <span className="tz-ctl-row">{label} <b>{value}{unit}</b></span>
      <input className="range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    </label>
  );
}

export default function Tool() {
  const lang = useShellLang(); const es = lang === 'es';
  const { caseId, op, result, setCase, patch } = useWorkbench();
  const r = result;
  const cur = CASES.find((c) => c.id === caseId);

  const verdict = !r.valid ? { cls: 'bad', label: es ? 'Punto inválido' : 'Invalid point' }
    : r.regime === 'pass-through' ? { cls: 'warn', label: es ? 'Paso directo' : 'Pass-through' }
    : { cls: 'ok', label: es ? 'Operación válida' : 'Valid operation' };

  return (
    <section className="tz-layout">
      {/* ---- control sidebar ---- */}
      <aside className="tz-controls">
        <div className="tz-ctl">
          <span>{es ? 'Caso' : 'Case'}</span>
          <select className="tz-sel" value={caseId} onChange={(e) => setCase(e.target.value)}>
            {CASES.map((c) => <option key={c.id} value={c.id}>{c.id} — {c.name}</option>)}
          </select>
          {cur && <span className="tz-panel-sub">{cur.blurb}</span>}
        </div>

        <div className="tz-ctl">
          <span>{es ? 'Máquina' : 'Machine'}</span>
          <div className="tz-chips">{MACHINES.map((m) => (
            <button key={m.id} className={`chip ${op.machine === m.id ? 'on' : ''}`} onClick={() => patch({ machine: m.id })}>{es ? m.es : m.en}</button>
          ))}</div>
        </div>

        <Slider label="CSS" unit=" mm" value={op.cssMm} min={4} max={200} step={1} onChange={(v) => patch({ cssMm: v })} />
        <Slider label={es ? 'Carrera (throw)' : 'Throw'} unit=" mm" value={op.throwMm} min={8} max={50} step={1} onChange={(v) => patch({ throwMm: v })} />
        <Slider label={es ? 'Velocidad' : 'Speed'} unit=" rpm" value={op.speedRpm} min={150} max={600} step={5} onChange={(v) => patch({ speedRpm: v })} />
        <Slider label={es ? 'Feed x63' : 'Feed x63'} unit=" mm" value={op.feedX63Mm} min={20} max={500} step={5} onChange={(v) => patch({ feedX63Mm: v })} />
        <Slider label={es ? 'Feed m (uniformidad)' : 'Feed m (uniformity)'} unit="" value={op.feedM} min={0.6} max={2.2} step={0.05} onChange={(v) => patch({ feedM: v })} />
        <Slider label={es ? 'Dureza A·b' : 'Ore A·b'} unit="" value={op.oreAxb} min={25} max={120} step={1} onChange={(v) => patch({ oreAxb: v })} />

        <div className="tz-decision">
          <span className="tz-decision-h">{es ? 'Veredicto' : 'Verdict'}</span>
          <span className="tz-verdict"><span className={`tz-badge ${verdict.cls}`}>{verdict.label}</span></span>
          <div className="tz-panel-sub">{es ? 'Régimen' : 'Regime'}: <b style={{ fontFamily: 'var(--font-mono)' }}>{r.regime}</b> · OSS {r.ossMm} mm · {es ? 'nip' : 'nip'} {r.nipAngleDeg.toFixed(1)}° / {es ? 'límite' : 'limit'} {r.nipLimitDeg.toFixed(1)}°</div>
          {r.flags.length > 0 && <ul className="tz-flags">{r.flags.map((f, i) => <li key={i}>{f}</li>)}</ul>}
        </div>
      </aside>

      {/* ---- reactive main ---- */}
      <div className="tz-main">
        <div className="tz-kpis">
          <div className="tz-kpi"><div className="tz-kpi-v">{r.p80.toFixed(1)}</div><div className="tz-kpi-l">P80 <span className="tz-kpi-u">mm</span></div></div>
          <div className="tz-kpi"><div className="tz-kpi-v">{r.reductionRatio.toFixed(2)}×</div><div className="tz-kpi-l">{es ? 'Reducción' : 'Reduction'}</div></div>
          <div className="tz-kpi"><div className="tz-kpi-v">{r.throughputTph.toFixed(0)}</div><div className="tz-kpi-l">{es ? 'Capacidad' : 'Throughput'} <span className="tz-kpi-u">t/h</span></div></div>
          <div className="tz-kpi"><div className="tz-kpi-v">{r.powerKw.toFixed(0)}</div><div className="tz-kpi-l">{es ? 'Potencia' : 'Power'} <span className="tz-kpi-u">kW</span></div></div>
        </div>

        <div className="tz-panel">
          <div className="tz-panel-t">{es ? 'Gradación: alimentación vs producto' : 'Gradation: feed vs product'}</div>
          <div className="tz-panel-sub">{es ? 'Curva de % pasante en escala semilog. Reacciona a cada control.' : 'Cumulative %-passing on a semilog axis. Reacts to every control.'}</div>
          <PsdChart feed={r.feed} product={r.product} f80={r.f80} p80={r.p80} />
        </div>

        <div className="tz-panel">
          <div className="tz-panel-t">{es ? 'Pasante del producto a tamaños clave' : 'Product passing at key sizes'}</div>
          <table className="tz-table">
            <thead><tr><th>{es ? 'Tamaño' : 'Size'}</th>{[1, 4, 8, 16, 32].map((s) => <th key={s} className="num">{s} mm</th>)}</tr></thead>
            <tbody><tr><td>{es ? '% pasante' : '% passing'}</td>{[1, 4, 8, 16, 32].map((s) => <td key={s} className="num">{(r.pctPassing[s] * 100).toFixed(1)}%</td>)}</tr></tbody>
          </table>
        </div>

        <p className="tz-note">{es
          ? 'Motor de balance poblacional de Whiten + capacidad de Evertsson + potencia de Bond, en TypeScript puro y en vivo. Las constantes K1/K2/K3 y el acople de energía son ilustrativos (reproducen tendencias, no una planta específica) hasta calibrar con datos industriales abiertos.'
          : 'Live pure-TypeScript Whiten population-balance engine + Evertsson capacity + Bond power. The K1/K2/K3 constants and the energy coupling are illustrative (they reproduce trends, not a specific plant) pending calibration to open industrial data.'}</p>
      </div>
    </section>
  );
}
