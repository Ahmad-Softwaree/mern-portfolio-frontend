import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path-browserify";
// https://vitejs.dev/config/

//http://localhost:3001
//https://api.ahmad-software.com

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  server: {
    watch: {
      usePolling: true,
    },
    open: true,
    port: 3000,
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://api.ahmad-softare.com",
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
});
