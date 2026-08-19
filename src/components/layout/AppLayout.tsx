/**
 * Main application layout for Cellarium.
 *
 * This component provides the shared structure used across the app:
 * a reusable sidebar on the left and a main content area on the right.
 */

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

/**
 * Define the type of data AppLayout expects.
 *
 * "children" means any React content placed between
 * <AppLayout> and </AppLayout>.
 */
type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-cream">

      {/* Reusable navigation sidebar */}
      <Sidebar />

      {/* Main page content */}
      <main className="ml-64 min-h-screen p-10">
        {children}
      </main>

    </div>
  );
}

export default AppLayout;