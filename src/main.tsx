import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    {/* BrowserRouter allows Cellarium to switch between pages
        without reloading the entire website. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </StrictMode>,
);