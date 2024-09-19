import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows external connections
    port: 5173, // Make sure this matches your port

    proxy: {
      "/api": {
        target: "http://localhost:3000", // Proxy to backend server
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Adjust this limit as needed
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});