/**
 * Thaw workflow page.
 *
 * This page will eventually guide the user through
 * recovering a frozen cell stock and establishing a new culture.
 */

function Thaw() {
  return (
    <section>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
        Cell culture workflow
      </p>

      <h2 className="text-5xl font-semibold text-sage-dark">
        Thaw Cells
      </h2>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
        Recover a frozen cell stock and establish a new culture.
      </p>
    </section>
  );
}

export default Thaw;