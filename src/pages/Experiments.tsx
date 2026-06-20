import { Refs, useShellLang } from '@fasl-work/caos-app-shell';
import { CASES } from '../data/cases';

// Experiments — the case-coverage matrix and the controlled sweeps the studio runs. The offline LHS sweep +
// surrogate parity plots are wired in once the pipeline artifacts land (build stage F); this page documents the
// design + the live case matrix now.
export default function Experiments() {
  const es = useShellLang() === 'es';
  return (
    <section className="tz-prose" style={{ maxWidth: '100%' }}>
      <h2>{es ? 'Experimentos' : 'Experiments'}</h2>
      <p className="tz-lead">{es ? 'La cobertura de casos y los barridos controlados que explora el estudio: tipo de máquina, dureza, granulometría de alimentación, régimen y los dos controles (paso directo e inválido).' : 'The case coverage and controlled sweeps the studio explores: machine type, hardness, feed gradation, regime, and the two controls (pass-through and invalid).'}</p>

      <h3>{es ? 'Matriz de casos' : 'Case matrix'}</h3>
      <table className="tz-table">
        <thead><tr><th>ID</th><th>{es ? 'Caso' : 'Case'}</th><th>{es ? 'Máquina' : 'Machine'}</th><th className="num">CSS</th><th className="num">A·b</th><th>{es ? 'Tipo' : 'Type'}</th></tr></thead>
        <tbody>{CASES.map((c) => (
          <tr key={c.id}><td><b>{c.id}</b></td><td>{c.name}</td><td>{c.machine}</td><td className="num">{c.cssMm}</td><td className="num">{c.oreAxb}</td>
            <td>{c.control ? <span className={`tz-badge ${c.control === 'invalid' ? 'bad' : c.control === 'negative' ? 'warn' : 'ok'}`}>{c.control}</span> : '—'}</td></tr>
        ))}</tbody>
      </table>

      <h3>{es ? 'Barridos controlados' : 'Controlled sweeps'}</h3>
      <ul>
        <li>{es ? <><b>CSS → P80.</b> Cerrar el CSS afina el producto monótonamente (verificado en los tests del motor). La pestaña de mapa de operación muestra P80 sobre velocidad×CSS.</> : <><b>CSS → P80.</b> Closing the CSS makes the product monotonically finer (asserted in the engine tests). The operating-map tab shows P80 over speed×CSS.</>}</li>
        <li>{es ? <><b>Velocidad → capacidad.</b> La capacidad sube hasta un óptimo y luego cae (la joroba de Evertsson) — C03 y C08 cruzan deliberadamente al lado descendente.</> : <><b>Speed → capacity.</b> Capacity rises to an optimum then falls (the Evertsson hump) — C03 and C08 deliberately cross to the falling side.</>}</li>
        <li>{es ? <><b>Controles.</b> C12 (paso directo, CSS ≥ F80) debe mostrar reducción ≈1; C13 (CSS &gt; tope de feed) debe marcarse inválido, nunca un gráfico bonito.</> : <><b>Controls.</b> C12 (pass-through, CSS ≥ F80) must show reduction ≈1; C13 (CSS &gt; feed top) must be flagged invalid, never a pretty plot.</>}</li>
      </ul>

      <p className="tz-note">{es ? 'El barrido Latin-hypercube offline (≈2000–4000 puntos) que entrena el surrogate, y los gráficos de paridad surrogate-vs-física, se incorporan cuando los artefactos del pipeline (cz-cases.json, surrogate_metrics.json) están listos.' : 'The offline Latin-hypercube sweep (≈2000–4000 points) that trains the surrogate, and the surrogate-vs-physics parity plots, are wired in once the pipeline artifacts (cz-cases.json, surrogate_metrics.json) are ready.'}</p>
      <Refs ids={['duarte2021', 'quist2016', 'napiermunn1996']} label="References" />
    </section>
  );
}
