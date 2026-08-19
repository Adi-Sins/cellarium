/**
 * Main Cellarium application component.
 *
 * App.tsx controls which page is displayed based on the current URL.
 */

import { Route, Routes } from "react-router";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Passage from "./pages/Passage";
import Planner from "./pages/Planner";
import Calculators from "./pages/Calculators";
import Library from "./pages/Library";
import Protocols from "./pages/Protocols";
import Settings from "./pages/Settings";

function App() {
  return (
    <AppLayout>
      <Routes>

        {/* Main dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Cell culture workflow */}
        <Route path="/cell-culture" element={<Passage />} />

        {/* Planning */}
        <Route path="/planner" element={<Planner />} />

        {/* Scientific calculators */}
        <Route path="/calculators" element={<Calculators />} />

        {/* Cell-line reference library */}
        <Route path="/library" element={<Library />} />

        {/* Protocols and methodology */}
        <Route path="/protocols" element={<Protocols />} />

        {/* Application settings */}
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </AppLayout>
  );
}

export default App;