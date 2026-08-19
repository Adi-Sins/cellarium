/**
 * Dashboard page.
 *
 * The Dashboard acts as the home screen for Cellarium.
 * It will eventually display active cultures, upcoming tasks,
 * reminders and quick actions.
 */

function Dashboard() {
  return (
    <section>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
        Cell culture workspace
      </p>

      <h2 className="text-5xl font-semibold text-sage-dark">
        Dashboard
      </h2>

      <p className="mt-4 text-lg text-ink">
        What are we growing today?
      </p>
    </section>
  );
}

export default Dashboard;