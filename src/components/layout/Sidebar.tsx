/**
 * Sidebar navigation for Cellarium.
 *
 * The sidebar provides access to the main sections of the application.
 */

// Store our navigation items in an array.
// Each object represents one section of Cellarium.

import { NavLink } from "react-router";

// Each navigation item stores both its display name and URL path.
const navigationItems = [
  { name: "Dashboard", path: "/" },
  { name: "Cell Culture", path: "/cell-culture" },
  { name: "Planner", path: "/planner" },
  { name: "Calculators", path: "/calculators" },
  { name: "Cell Library", path: "/library" },
  { name: "Protocols", path: "/protocols" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-sage-dark p-6 text-white">

      {/* Cellarium branding */}
      <div>
        <h1 className="text-3xl font-semibold">
          Cellarium
        </h1>

        <p className="mt-2 text-sm leading-5 text-white/70">
          Designed for scientists, not mathematicians.
        </p>
      </div>

      {/* Main navigation */}
      <nav className="mt-10">
        <ul className="space-y-2">

          {navigationItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                    [
                    "block w-full rounded-xl px-4 py-3 text-left text-sm transition",
                    isActive
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white",
                    ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

        </ul>
      </nav>

      {/* Settings stays at the bottom of the sidebar */}
      <div className="mt-auto">
        <NavLink
        to="/settings"
        className={({ isActive }) =>
            [
            "block w-full rounded-xl px-4 py-3 text-left text-sm transition",
            isActive
                ? "bg-white/15 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white",
            ].join(" ")
         }
        >
         Settings
        </NavLink>
      </div>

    </aside>
  );
}

export default Sidebar;