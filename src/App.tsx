/**
 * Main Cellarium application component.
 *
 * App.tsx controls which page is displayed based on the current URL.
 */

import { Route, Routes } from "react-router";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import CellCulture from "./pages/CellCulture";
import Planner from "./pages/Planner";
import Calculators from "./pages/Calculators";
import Library from "./pages/Library";
import Passage from "./pages/Passage";
import Protocols from "./pages/Protocols";
import Thaw from "./pages/Thaw";
import Freeze from "./pages/Freeze";
import CellCount from "./pages/CellCount";
import MediaChange from "./pages/MediaChange";
import Settings from "./pages/Settings";

function App() {
  return (
    <AppLayout>
      <Routes>

        {/* Main dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Cell culture workflow */}
        <Route path="/cell-culture" element={<CellCulture />} />

        {/* Passage workflow */}
        <Route path="/cell-culture/passage" element={<Passage />} />

        {/* Planning */}
        <Route path="/planner" element={<Planner />} />

        {/* Scientific calculators */}
        <Route path="/calculators" element={<Calculators />} />

        {/* Cell-line reference library */}
        <Route path="/library" element={<Library />} />

        {/* Protocols and methodology */}
        <Route path="/protocols" element={<Protocols />} />

        {/* Thaw workflow */}
        <Route path="/cell-culture/thaw" element={<Thaw />} />

        {/* Freeze workflow */}
        <Route path="/cell-culture/freeze" element={<Freeze />} />

        {/* Cell count workflow */}
        <Route path="/cell-culture/count" element={<CellCount />} />

        {/* Media change workflow */}
        <Route path="/cell-culture/media-change" element={<MediaChange />} />

        {/* Application settings */}
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </AppLayout>
  );
}

export default App;