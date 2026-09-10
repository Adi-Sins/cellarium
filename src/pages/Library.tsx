/**
 * Cell Library page.
 *
 * This page allows users to define and manage cell-line profiles.
 * In a later phase, these profiles will be stored in Supabase.
 */

import { useEffect, useState } from "react";

import { vessels } from "../data/vessels";
import { mediaRecipes } from "../data/media";

import type {
  CellLine,
  CultureBehaviour,
  PassageStrategy,
} from "../types/CellLine";

import { supabase } from "../utils/supabase";

function Library() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [tissue, setTissue] = useState("");

  const [cultureBehaviour, setCultureBehaviour] =
  useState<CultureBehaviour>("adherent");
  const [passageStrategy, setPassageStrategy] =
  useState<PassageStrategy>("split-ratio");

  const [selectedMedia, setSelectedMedia] = useState("");
  const [selectedVessels, setSelectedVessels] = useState<string[]>([]);

  // Passage-strategy specific values.
  const [splitNumerator, setSplitNumerator] = useState("1");
  const [splitDenominator, setSplitDenominator] = useState("5");

  const [targetCellsPerVessel, setTargetCellsPerVessel] = useState("");
  const [targetCellsPerCm2, setTargetCellsPerCm2] = useState("");
  const [targetCellsPerMl, setTargetCellsPerMl] = useState("");

  // Additional culture characteristics.
  const [doublingTimeHours, setDoublingTimeHours] = useState("");
  const [confluencyMin, setConfluencyMin] = useState("");
  const [confluencyMax, setConfluencyMax] = useState("");
  const [coating, setCoating] = useState("");
  const [notes, setNotes] = useState("");

  // Cell lines created during the current session.
  // Later, these will come from the user's database account.
  const [cellLines, setCellLines] = useState<CellLine[]>([]);
  const [editingCellLineId, setEditingCellLineId] = useState<string | null>(null);

  function toggleVessel(vesselId: string) {
    if (selectedVessels.includes(vesselId)) {
      setSelectedVessels(
        selectedVessels.filter((id) => id !== vesselId)
      );
    } else {
      setSelectedVessels([
        ...selectedVessels,
        vesselId,
      ]);
    }
  }

  async function loadCellLines() {
    const { data, error } = await supabase
      .from("cell_lines")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading cell lines:", error);
      return;
    }

    const formattedCellLines: CellLine[] = data.map((row) => ({
      id: row.id,
      name: row.name,
      species: row.species,
      tissue: row.tissue,

      cultureBehaviour: row.culture_behaviour,
      basalMedium: row.basal_medium ?? "",
      supplements: [],

      passageStrategy: row.passage_strategy,

      typicalSplitRatio:
        row.split_numerator !== null && row.split_denominator !== null
          ? {
              numerator: row.split_numerator,
              denominator: row.split_denominator,
            }
          : undefined,

      targetCellsPerVessel: row.target_cells_per_vessel ?? undefined,
      targetCellsPerCm2: row.target_cells_per_cm2 ?? undefined,
      targetCellsPerMl: row.target_cells_per_ml ?? undefined,

      doublingTimeHours: row.doubling_time_hours ?? undefined,

      passageConfluencyMin:
        row.passage_confluency_min ?? undefined,

      passageConfluencyMax:
        row.passage_confluency_max ?? undefined,

      preferredVessels: [],

      coating: row.coating ?? undefined,
      notes: row.notes ?? undefined,
    }));

    setCellLines(formattedCellLines);


  }

  
  useEffect(() => {
    const timer = setTimeout(() => {
      loadCellLines();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  async function saveCellLine() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No logged-in user found.");
      return;
    }
    
    // Do not create a profile without a cell-line name.
    if (!name.trim()) {
      return;
    }

    const newCellLine: CellLine = {
      id: crypto.randomUUID(),

      name: name.trim(),
      species: species.trim(),
      tissue: tissue.trim(),

      cultureBehaviour,

      basalMedium:
        mediaRecipes.find((media) => media.id === selectedMedia)?.basalMedium ?? "",

      supplements:
        mediaRecipes.find((media) => media.id === selectedMedia)?.components ?? [],

      passageStrategy,

      preferredVessels: selectedVessels,

      coating: coating.trim() || undefined,
      notes: notes.trim() || undefined,

      doublingTimeHours:
        doublingTimeHours === ""
          ? undefined
          : Number(doublingTimeHours),

      passageConfluencyMin:
        confluencyMin === ""
          ? undefined
          : Number(confluencyMin),

      passageConfluencyMax:
        confluencyMax === ""
          ? undefined
          : Number(confluencyMax),

      ...(passageStrategy === "split-ratio" && {
        typicalSplitRatio: {
          numerator: Number(splitNumerator),
          denominator: Number(splitDenominator),
        },
      }),

      ...(passageStrategy === "cells-per-vessel" && {
        targetCellsPerVessel: Number(targetCellsPerVessel),
      }),

      ...(passageStrategy === "cells-per-cm2" && {
        targetCellsPerCm2: Number(targetCellsPerCm2),
      }),

      ...(passageStrategy === "cells-per-ml" && {
        targetCellsPerMl: Number(targetCellsPerMl),
      }),
    };

    //setCellLines([...cellLines, newCellLine]);
    let error;

    if (editingCellLineId) {
      // Update an existing cell line
      const result = await supabase
        .from("cell_lines")
        .update({
          name: newCellLine.name,
          species: newCellLine.species,
          tissue: newCellLine.tissue,
          culture_behaviour: newCellLine.cultureBehaviour,

          basal_medium: newCellLine.basalMedium || null,
          passage_strategy: newCellLine.passageStrategy,

          target_cells_per_vessel:
            newCellLine.targetCellsPerVessel ?? null,

          target_cells_per_cm2:
            newCellLine.targetCellsPerCm2 ?? null,

          target_cells_per_ml:
            newCellLine.targetCellsPerMl ?? null,

          split_numerator:
            newCellLine.typicalSplitRatio?.numerator ?? null,

          split_denominator:
            newCellLine.typicalSplitRatio?.denominator ?? null,

          doubling_time_hours:
            newCellLine.doublingTimeHours ?? null,

          passage_confluency_min:
            newCellLine.passageConfluencyMin ?? null,

          passage_confluency_max:
            newCellLine.passageConfluencyMax ?? null,

          coating: newCellLine.coating ?? null,
          notes: newCellLine.notes ?? null,
        })
        .eq("id", editingCellLineId);

      error = result.error;
    } else {
      // Create a new cell line
      const result = await supabase
        .from("cell_lines")
        .insert({
          user_id: user.id,

          name: newCellLine.name,
          species: newCellLine.species,
          tissue: newCellLine.tissue,
          culture_behaviour: newCellLine.cultureBehaviour,

          basal_medium: newCellLine.basalMedium || null,
          passage_strategy: newCellLine.passageStrategy,

          target_cells_per_vessel:
            newCellLine.targetCellsPerVessel ?? null,

          target_cells_per_cm2:
            newCellLine.targetCellsPerCm2 ?? null,

          target_cells_per_ml:
            newCellLine.targetCellsPerMl ?? null,

          split_numerator:
            newCellLine.typicalSplitRatio?.numerator ?? null,

          split_denominator:
            newCellLine.typicalSplitRatio?.denominator ?? null,

          doubling_time_hours:
            newCellLine.doublingTimeHours ?? null,

          passage_confluency_min:
            newCellLine.passageConfluencyMin ?? null,

          passage_confluency_max:
            newCellLine.passageConfluencyMax ?? null,

          coating: newCellLine.coating ?? null,
          notes: newCellLine.notes ?? null,
        });

      error = result.error;
    } 

    if (error) {
      console.error("Error saving cell line:", error);
      return;
    }

    await loadCellLines();
    setEditingCellLineId(null);
    // Reset the form after a successful save
    setName("");
    setSpecies("");
    setTissue("");

    setCultureBehaviour("adherent");
    setPassageStrategy("split-ratio");

    setSelectedMedia("");
    setSelectedVessels([]);

    setSplitNumerator("1");
    setSplitDenominator("5");

    setTargetCellsPerVessel("");
    setTargetCellsPerCm2("");
    setTargetCellsPerMl("");

    setDoublingTimeHours("");
    setConfluencyMin("");
    setConfluencyMax("");

    setCoating("");
    setNotes("");

  }

  function editCellLine(cellLine: CellLine) {
    // Remember which cell line we are editing
    setEditingCellLineId(cellLine.id);

    // Fill the form with the saved cell-line data
    setName(cellLine.name);
    setSpecies(cellLine.species);
    setTissue(cellLine.tissue);

    setCultureBehaviour(cellLine.cultureBehaviour);
    setPassageStrategy(cellLine.passageStrategy);

    setSplitNumerator(
      cellLine.typicalSplitRatio?.numerator.toString() ?? "1"
    );

    setSplitDenominator(
      cellLine.typicalSplitRatio?.denominator.toString() ?? "5"
    );

    setTargetCellsPerVessel(
      cellLine.targetCellsPerVessel?.toString() ?? ""
    );

    setTargetCellsPerCm2(
      cellLine.targetCellsPerCm2?.toString() ?? ""
    );

    setTargetCellsPerMl(
      cellLine.targetCellsPerMl?.toString() ?? ""
    );

    setDoublingTimeHours(
      cellLine.doublingTimeHours?.toString() ?? ""
    );

    setConfluencyMin(
      cellLine.passageConfluencyMin?.toString() ?? ""
    );

    setConfluencyMax(
      cellLine.passageConfluencyMax?.toString() ?? ""
    );

    setCoating(cellLine.coating ?? "");
    setNotes(cellLine.notes ?? "");
  }

  async function deleteCellLine(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cell line?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("cell_lines")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting cell line:", error);
      return;
    }

    await loadCellLines();
  }

  function formatCellNumber(value: number) {
    return value.toLocaleString();
  }

  function getPassageStrategyLabel(strategy: PassageStrategy) {
    switch (strategy) {
      case "split-ratio":
        return "Split ratio";

      case "cells-per-vessel":
        return "Target cells per vessel";

      case "cells-per-cm2":
        return "Target seeding density";

      case "cells-per-ml":
        return "Target culture density";
    }
  }

  function getVesselName(vesselId: string) {
    return (
      vessels.find((vessel) => vessel.id === vesselId)?.name ??
      vesselId
    );
  }

  return (
    <section className="max-w-5xl">
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
          Cell reference
        </p>

        <h2 className="text-5xl font-semibold text-sage-dark">
          Cell Library
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
          Create cell-line profiles containing culture behaviour,
          media, vessel preferences, and passage information.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-sage-dark/10 bg-white/60 p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-sage-dark">
          Add Cell Line
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Cell line name
            </span>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. HEK293T"
              className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Species
            </span>

            <input
              type="text"
              value={species}
              onChange={(event) => setSpecies(event.target.value)}
              placeholder="e.g. Human"
              className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Tissue
            </span>

            <input
              type="text"
              value={tissue}
              onChange={(event) => setTissue(event.target.value)}
              placeholder="e.g. Kidney"
              className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Culture behaviour
            </span>

            <select
              value={cultureBehaviour}
              onChange={(event) =>
                setCultureBehaviour(event.target.value as CultureBehaviour)
              }
              className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            >
              <option value="adherent">Adherent</option>
              <option value="suspension">Suspension</option>
              <option value="semi-adherent">Semi-adherent</option>
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Passage strategy
            </span>

            <select
              value={passageStrategy}
              onChange={(event) =>
                setPassageStrategy(event.target.value as PassageStrategy)
              }
              className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            >
              <option value="split-ratio">Split ratio</option>
              <option value="cells-per-vessel">Cells per vessel</option>
              <option value="cells-per-cm2">Cells per cm²</option>
              <option value="cells-per-ml">Cells per mL</option>
            </select>
          </label>

          {/* Show different inputs depending on the selected passage strategy. */}

          {passageStrategy === "split-ratio" && (
            <div className="md:col-span-2">
              <span className="text-sm font-medium text-ink">
                Typical split ratio
              </span>

              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={splitNumerator}
                  onChange={(event) => setSplitNumerator(event.target.value)}
                  className="w-24 rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
                />

                <span className="text-lg text-ink/60">:</span>

                <input
                  type="number"
                  min="1"
                  value={splitDenominator}
                  onChange={(event) => setSplitDenominator(event.target.value)}
                  className="w-24 rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
                />
              </div>
            </div>
          )}

          {passageStrategy === "cells-per-vessel" && (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ink">
                Target cells per vessel
              </span>

              <input
                type="number"
                value={targetCellsPerVessel}
                onChange={(event) => setTargetCellsPerVessel(event.target.value)}
                placeholder="e.g. 2000000"
                className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
              />

              <span className="text-xs text-ink/50">
                cells/vessel
              </span>
            </label>
          )}

          {passageStrategy === "cells-per-cm2" && (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ink">
                Target seeding density
              </span>

              <input
                type="number"
                value={targetCellsPerCm2}
                onChange={(event) => setTargetCellsPerCm2(event.target.value)}
                placeholder="e.g. 20000"
                className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
              />

              <span className="text-xs text-ink/50">
                cells/cm²
              </span>
            </label>
          )}

          {passageStrategy === "cells-per-ml" && (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ink">
                Target culture density
              </span>

              <input
                type="number"
                value={targetCellsPerMl}
                onChange={(event) => setTargetCellsPerMl(event.target.value)}
                placeholder="e.g. 300000"
                className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
              />

              <span className="text-xs text-ink/50">
                cells/mL
              </span>
            </label>
          )}


          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Media recipe
            </span>

            <select
              value={selectedMedia}
              onChange={(event) => setSelectedMedia(event.target.value)}
              className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            >
              <option value="">Select media</option>

              {mediaRecipes.map((media) => (
                <option
                  key={media.id}
                  value={media.id}
                >
                  {media.name}
                </option>
              ))}
            </select>
          </label>

        </div>

        <div className="mt-8">
          <h4 className="text-sm font-medium text-ink">
            Preferred vessels
          </h4>

          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {vessels.map((vessel) => (
              <label
                key={vessel.id}
                className="flex items-center gap-3 rounded-xl border border-sage-dark/10 bg-white px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={selectedVessels.includes(vessel.id)}
                  onChange={() => toggleVessel(vessel.id)}
                />

                <span className="text-sm text-ink">
                  {vessel.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional culture information */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-sage-dark">
            Culture Details
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ink">
                Doubling time
              </span>

              <input
                type="number"
                min="0"
                value={doublingTimeHours}
                onChange={(event) => setDoublingTimeHours(event.target.value)}
                placeholder="e.g. 24"
                className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
              />

              <span className="text-xs text-ink/50">
                hours
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ink">
                Coating
              </span>

              <input
                type="text"
                value={coating}
                onChange={(event) => setCoating(event.target.value)}
                placeholder="e.g. None, collagen, poly-L-lysine"
                className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
              />
            </label>

            {/* Confluency is primarily meaningful for adherent cultures. */}
            {cultureBehaviour !== "suspension" && (
              <>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-ink">
                    Passage confluency — minimum
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={confluencyMin}
                    onChange={(event) => setConfluencyMin(event.target.value)}
                    placeholder="e.g. 70"
                    className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
                  />

                  <span className="text-xs text-ink/50">
                    %
                  </span>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-ink">
                    Passage confluency — maximum
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={confluencyMax}
                    onChange={(event) => setConfluencyMax(event.target.value)}
                    placeholder="e.g. 85"
                    className="rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
                  />

                  <span className="text-xs text-ink/50">
                    %
                  </span>
                </label>
              </>
            )}

          </div>

          <label className="mt-6 flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">
              Notes
            </span>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add culture-specific notes..."
              rows={4}
              className="resize-none rounded-xl border border-sage-dark/20 bg-white px-4 py-3 outline-none focus:border-sage"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={saveCellLine}
          className="mt-8 rounded-xl bg-sage px-6 py-3 font-medium text-white transition hover:bg-sage-dark"
        >
          Save Cell Line
        </button>
      </div>

      {/* Saved cell-line profiles */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-sage-dark">
          My Cell Lines
        </h3>

        {cellLines.length === 0 ? (
          <p className="mt-4 text-ink/60">
            No cell lines saved yet.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {cellLines.map((cellLine) => (
              <div
                key={cellLine.id}
                className="rounded-3xl border border-sage-dark/10 bg-white/60 p-6 shadow-sm"
              >
                <h4 className="text-2xl font-semibold text-sage-dark">
                  {cellLine.name}
                </h4>

                <p className="mt-2 text-sm text-ink/60">
                  {cellLine.species} · {cellLine.tissue}
                </p>

                <div className="mt-5 space-y-3 text-sm text-ink">

                  <p>
                    <strong>Culture behaviour:</strong>{" "}
                    {cellLine.cultureBehaviour.charAt(0).toUpperCase() +
                      cellLine.cultureBehaviour.slice(1)}
                  </p>

                  <p>
                    <strong>Basal medium:</strong>{" "}
                    {cellLine.basalMedium || "Not specified"}
                  </p>

                  <p>
                    <strong>Passage strategy:</strong>{" "}
                    {getPassageStrategyLabel(cellLine.passageStrategy)}
                  </p>


                  {/* Split-ratio cell lines */}
                  {cellLine.typicalSplitRatio && (
                    <p>
                      <strong>Typical split:</strong>{" "}
                      {cellLine.typicalSplitRatio.numerator}:
                      {cellLine.typicalSplitRatio.denominator}
                    </p>
                  )}


                  {/* Target cells per vessel */}
                  {cellLine.targetCellsPerVessel !== undefined && (
                    <p>
                      <strong>Target:</strong>{" "}
                      {formatCellNumber(cellLine.targetCellsPerVessel)} cells/vessel
                    </p>
                  )}


                  {/* Surface-area based seeding */}
                  {cellLine.targetCellsPerCm2 !== undefined && (
                    <p>
                      <strong>Target density:</strong>{" "}
                      {formatCellNumber(cellLine.targetCellsPerCm2)} cells/cm²
                    </p>
                  )}


                  {/* Suspension culture density */}
                  {cellLine.targetCellsPerMl !== undefined && (
                    <p>
                      <strong>Target density:</strong>{" "}
                      {formatCellNumber(cellLine.targetCellsPerMl)} cells/mL
                    </p>
                  )}


                  {cellLine.doublingTimeHours !== undefined && (
                    <p>
                      <strong>Doubling time:</strong>{" "}
                      {cellLine.doublingTimeHours} h
                    </p>
                  )}


                  {cellLine.passageConfluencyMin !== undefined &&
                    cellLine.passageConfluencyMax !== undefined && (
                      <p>
                        <strong>Passage confluency:</strong>{" "}
                        {cellLine.passageConfluencyMin}–
                        {cellLine.passageConfluencyMax}%
                      </p>
                    )}


                  <p>
                    <strong>Preferred vessels:</strong>{" "}
                    {cellLine.preferredVessels.length > 0
                      ? cellLine.preferredVessels
                          .map(getVesselName)
                          .join(", ")
                      : "Not specified"}
                  </p>


                  {cellLine.coating && (
                    <p>
                      <strong>Coating:</strong> {cellLine.coating}
                    </p>
                  )}

                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => editCellLine(cellLine)}
                    className="rounded-xl border border-sage-dark/20 px-4 py-2 text-sm font-medium text-sage-dark transition hover:bg-sage-light/10"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCellLine(cellLine.id)}
                    className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}

export default Library;