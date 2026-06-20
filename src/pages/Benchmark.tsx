import { Refs, useShellLang } from '@fasl-work/caos-app-shell';

// Benchmark — the three honest, separable checks (manifest §benchmarkDesign). Real metric values are rendered
// from surrogate_metrics.json once the offline training pipeline lands (build stage F); the design + honesty
// boundary are documented now.
export default function Benchmark() {
  const es = useShellLang() === 'es';
  return (
    <section className="tz-prose" style={{ maxWidth: '100%' }}>
      <h2>Benchmark</h2>
      <p className="tz-lead">{es ? 'Tres comprobaciones separables y reportadas con honestidad — la defensa central contra el sobre-ajuste y las afirmaciones huecas.' : 'Three separable, honestly-reported checks — the central defense against over-claiming and hollow accuracy.'}</p>

      <h3>{es ? '1 · Surrogate vs la física que emula' : '1 · Surrogate vs the physics it emulates'}</h3>
      <p>{es ? 'R²/MAPE por salida del MLP ONNX contra el motor exacto de balance poblacional, en un segundo barrido Latin-hypercube INDEPENDIENTE (otra semilla, no un split de filas — eso filtra el diseño). Objetivos: P80/P50 MAPE <3–5%, capacidad y potencia <5%, R²>0.99. Crítico: esto mide acuerdo con la física barata calibrada, NO con una planta real.' : 'Per-output R²/MAPE of the ONNX MLP against the exact population-balance engine, on a second INDEPENDENT Latin-hypercube draw (different seed, not a row-split — that leaks the design). Targets: P80/P50 MAPE <3–5%, throughput & power <5%, R²>0.99. Critical: this measures agreement with the calibrated cheap physics, NOT a real plant.'}</p>

      <h3>{es ? '2 · Acuerdo balance-poblacional ↔ DEM' : '2 · Population-balance ↔ DEM agreement'}</h3>
      <p>{es ? 'El check de "¿la capa en vivo ES de verdad la física?": la salida de la matriz de Whiten contra los escalares del DEM grueso offline (P80, t/h, kW) en puntos compartidos, con tolerancia declarada. Una brecha mayor a la tolerancia es señal de rediseño (derivar B/S del DEM), no algo para tapar.' : 'The "is the live tier actually the physics?" check: the Whiten-matrix output vs the offline coarse-grained DEM scalars (P80, t/h, kW) on shared points, with a stated tolerance. A gap beyond tolerance is a redesign signal (derive B/S from the DEM), not something to paper over.'}</p>

      <h3>{es ? '3 · Calibración a número absoluto' : '3 · Absolute-number calibration'}</h3>
      <p>{es ? 'Factores de escala contra datos industriales publicados de cono clase HP (Duarte et al. 2021, CC-BY), manteniendo el ancla de calibración ESTRICTAMENTE disjunta de cualquier punto de validación held-out. Además, el autoencoder se evalúa como AUC de clasificación de régimen del error de reconstrucción.' : 'Scale factors against published HP-class cone industrial data (Duarte et al. 2021, CC-BY), keeping the calibration anchor STRICTLY disjoint from any held-out validation point. Separately, the autoencoder is scored as the regime-classification AUC of its reconstruction error.'}</p>

      <p className="tz-note">{es ? 'Los valores numéricos (metrics.json) y los gráficos de paridad/residuales se renderizan aquí cuando el pipeline de entrenamiento offline esté listo. No se reportan números fabricados.' : 'The numeric values (metrics.json) and parity/residual plots render here once the offline training pipeline is ready. No fabricated numbers are reported.'}</p>
      <Refs ids={['duarte2021', 'morrell2009', 'quist2016', 'napiermunn1996']} label="References" />
    </section>
  );
}
