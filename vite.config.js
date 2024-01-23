import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: import.meta.env?.VITE_BACKED_API,
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
