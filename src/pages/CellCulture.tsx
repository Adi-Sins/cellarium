/**
 * Cell Culture page.
 *
 * This page currently acts as the entry point for cell culture workflows.
 * Later it will contain Passage, Thaw, Freeze, Count, and Media Change tools.
 */

import WorkflowCard from "../components/cards/WorkflowCard";

function Passage() {
  return (
    <section>

      {/* Page introduction */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
          Cell culture workspace
        </p>

        <h2 className="text-5xl font-semibold text-sage-dark">
          Cell Culture
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
          Manage your cultures from recovery through routine maintenance
          and cryopreservation.
        </p>
      </div>

      {/* Cell-culture workflow cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        <WorkflowCard
          title="Passage"
          description="Split and reseed an active culture."
          path="/cell-culture/passage"
        />

        <WorkflowCard
          title="Thaw"
          description="Recover a frozen cell stock and establish a new culture."
          path="/cell-culture/thaw"
        />

        <WorkflowCard
          title="Freeze"
          description="Prepare an active culture for cryopreservation."
          path="/cell-culture/freeze"
        />

        <WorkflowCard
          title="Cell Count"
          description="Calculate cell concentration, viability, and total cell number."
          path="/cell-culture/count"
        />

        <WorkflowCard
          title="Media Change"
          description="Plan and record routine culture-medium changes."
          path="/cell-culture/media-change"
        />

      </div>

    </section>
  );
}

export default Passage;