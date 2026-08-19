import { defineConfig } from "vite"; // import the Vite configuration function 
import react from "@vitejs/plugin-react"; // import the React plugin for Vite
import tailwindcss from "@tailwindcss/vite"; // import the Tailwind CSS plugin for Vite

export default defineConfig({ // export the Vite configuration 
  plugins: [react(), tailwindcss()], // specify the plugins to be used in the Vite configuration
});
