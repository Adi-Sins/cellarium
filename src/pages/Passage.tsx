/**
 * Cell Culture page.
 *
 * This page currently acts as the entry point for cell culture workflows.
 * Later it will contain Passage, Thaw, Freeze, Count, and Media Change tools.
 */

function Passage() {
  return (
    <section>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
        Cell culture workspace
      </p>

      <h2 className="text-5xl font-semibold text-sage-dark">
        Cell Culture
      </h2>

      <p className="mt-4 text-lg text-ink">
        Passage, thaw, freeze, count, and maintain your cultures here.
      </p>
    </section>
  );
}

export default Passage;