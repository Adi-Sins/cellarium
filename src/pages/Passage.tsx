/**
 * Passage workflow page.
 *
 * This page collects the information required to calculate
 * how an active culture should be distributed into new vessels.
 */

import { useState } from "react";

function Passage() {
    const [cellConcentration, setCellConcentration] = useState("");
    const [viability, setViability] = useState("");
    const [suspensionVolume, setSuspensionVolume] = useState("");

    const [targetCellsPerVessel, setTargetCellsPerVessel] = useState("");
    const [numberOfVessels, setNumberOfVessels] = useState("");
    const [finalVolumePerVessel, setFinalVolumePerVessel] = useState("");

    const [result, setResult] = useState<{ 
    viableConcentration: number;
    totalViableCells: number;
    totalCellsRequired: number;
    suspensionPerVessel: number;
    mediumPerVessel: number;
    remainingCells: number;
    } | null>(null);

    function calculatePassage() {
        const concentration = Number(cellConcentration);
        const viabilityPercent = Number(viability);
        const totalVolume = Number(suspensionVolume);

        const targetPerVessel = Number(targetCellsPerVessel);
        const vesselCount = Number(numberOfVessels);
        const finalVolume = Number(finalVolumePerVessel);

        const viableConcentration =
            concentration * (viabilityPercent / 100);

        const totalViableCells =
            viableConcentration * totalVolume;

        const totalCellsRequired =
            targetPerVessel * vesselCount;

        const suspensionPerVessel =
            targetPerVessel / viableConcentration;

        const mediumPerVessel =
            finalVolume - suspensionPerVessel;

        const remainingCells =
            totalViableCells - totalCellsRequired;

        setResult({
            viableConcentration,
            totalViableCells,
            totalCellsRequired,
            suspensionPerVessel,
            mediumPerVessel,
            remainingCells,
        });
        }

  return (
    <section className="max-w-4xl">

      {/* Page heading */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
          Cell culture workflow
        </p>

        <h2 className="text-5xl font-semibold text-sage-dark">
          Passage Cells
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
          Enter your current culture measurements and Cellarium will calculate
          how much cell suspension and fresh medium you need.
        </p>
      </div>

      {/* Passage input form */}
      <div className="mt-10 rounded-3xl border border-sage-dark/10 bg-white/60 p-8 shadow-sm">

        <h3 className="text-2xl font-semibold text-sage-dark">
          Current Culture
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Cell concentration
            </span>

            <input
            type="number"
            placeholder="e.g. 1200000"
            value={cellConcentration}
            onChange={(event) => setCellConcentration(event.target.value)}
            className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />

            <span className="text-xs text-ink/50">
              cells/mL
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Viability
            </span>

            <input
            type="number"
            placeholder="e.g. 94"
            value={viability}
            onChange={(event) => setViability(event.target.value)}
            className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />

            <span className="text-xs text-ink/50">
              %
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Suspension volume
            </span>

            <input
            type="number"
            placeholder="e.g. 10"
            value={suspensionVolume}
            onChange={(event) => setSuspensionVolume(event.target.value)}
            className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />

            <span className="text-xs text-ink/50">
              mL
            </span>
          </label>

        </div>

        <h3 className="mt-10 text-2xl font-semibold text-sage-dark">
          Destination
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Target cells per vessel
            </span>

            <input
            type="number"
            placeholder="e.g. 2000000"
            value={targetCellsPerVessel}
            onChange={(event) => setTargetCellsPerVessel(event.target.value)}
            className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />
          </label>


          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Number of vessels
            </span>

            <input
            type="number"
            placeholder="e.g. 3"
            value={numberOfVessels}
            onChange={(event) => setNumberOfVessels(event.target.value)}
            className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Final volume per vessel
            </span>

            <input
            type="number"
            placeholder="e.g. 10"
            value={finalVolumePerVessel}
            onChange={(event) => setFinalVolumePerVessel(event.target.value)}
            className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />

            <span className="text-xs text-ink/50">
              mL
            </span>
          </label>

        </div>

        <button
          type="button"
          onClick={calculatePassage}
          className="mt-8 rounded-xl bg-sage px-6 py-3 font-medium text-white transition hover:bg-sage-dark"
        >
          Calculate Passage
        </button>

        {result && (
        <div className="mt-8 rounded-2xl bg-cream p-6">

            <h3 className="text-xl font-semibold text-sage-dark">
            Passage Results
            </h3>

            <div className="mt-4 space-y-3 text-ink">

            <p>
                <strong>Viable concentration:</strong>{" "}
                {result.viableConcentration.toLocaleString()} cells/mL
            </p>

            <p>
                <strong>Total viable cells:</strong>{" "}
                {result.totalViableCells.toLocaleString()} cells
            </p>

            <p>
                <strong>Total cells required:</strong>{" "}
                {result.totalCellsRequired.toLocaleString()} cells
            </p>

            <p>
                <strong>Cell suspension per vessel:</strong>{" "}
                {result.suspensionPerVessel.toFixed(2)} mL
            </p>

            <p>
                <strong>Fresh medium per vessel:</strong>{" "}
                {result.mediumPerVessel.toFixed(2)} mL
            </p>

            <p>
                <strong>Remaining viable cells:</strong>{" "}
                {result.remainingCells.toLocaleString()} cells
            </p>

            </div>

        </div>
        )}

      </div>
    </section>
  );
}

export default Passage;