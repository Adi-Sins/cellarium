/**
 * Reusable workflow card for Cellarium.
 *
 * This component displays a title, description,
 * and destination path for a cell-culture workflow.
 */

import { Link } from "react-router";

/**
 * Define the information that each WorkflowCard needs.
 */
type WorkflowCardProps = {
  title: string;
  description: string;
  path: string;
};

/**
 * Render a single workflow card.
 */
function WorkflowCard({
  title,
  description,
  path,
}: WorkflowCardProps) {
  return (
    <Link
      to={path}
      className="group rounded-3xl border border-sage-dark/10 bg-white/60 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-2xl font-semibold text-sage-dark">
        {title}
      </h3>

      <p className="mt-3 leading-6 text-ink/70">
        {description}
      </p>

      <p className="mt-6 text-sm font-medium text-sage">
        Open workflow →
      </p>
    </Link>
  );
}

export default WorkflowCard;