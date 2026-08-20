/**
 * Freeze workflow page.
 *
 * This page will eventually guide the user through
 * preparing an active culture for cryopreservation.
 */

function Freeze() {
  return (
    <section>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
        Cell culture workflow
      </p>

      <h2 className="text-5xl font-semibold text-sage-dark">
        Freeze Cells
      </h2>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
        Prepare an active culture for cryopreservation.
      </p>
    </section>
  );
}

export default Freeze;