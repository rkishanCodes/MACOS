import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", 
    port: 5173, 

    proxy: {
      "/api": {
        target: "http://localhost:3000", 
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
