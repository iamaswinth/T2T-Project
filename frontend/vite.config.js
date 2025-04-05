import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from the local network
    port: 5173, // Specify a port (default: 5173)
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
    },
    allowedHosts: [
      "6579-2409-40f4-2100-9741-59a2-db6b-1e47-1f8d.ngrok-free.app",
    ],
  },
});
