/**
 * Cell count workflow page.
 *
 * This page will eventually calculate cell concentration,
 * viability, and total viable cell number.
 */

function CellCount() {
  return (
    <section>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
        Cell culture workflow
      </p>

      <h2 className="text-5xl font-semibold text-sage-dark">
        Cell Count
      </h2>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
        Calculate cell concentration, viability, and total cell number.
      </p>
    </section>
  );
}

export default CellCount;