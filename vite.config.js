import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows external connections
    port: 5173, // Make sure this matches your port

    proxy: {
      "/api": {
        target: "http://localhost:3000", // Proxy to backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
