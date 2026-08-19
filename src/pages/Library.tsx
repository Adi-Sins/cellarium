/**
 * Cell Library page.
 *
 * This page will eventually store reference information for each cell line,
 * including morphology, media, growth characteristics, and culture notes.
 */

function Library() {
  return (
    <section>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
        Cell reference
      </p>

      <h2 className="text-5xl font-semibold text-sage-dark">
        Cell Library
      </h2>

      <p className="mt-4 text-lg text-ink">
        Browse cell lines, media requirements, and culture guidance.
      </p>
    </section>
  );
}

export default Library;