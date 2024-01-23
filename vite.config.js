import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      input: "/src/plugins/app/_config/main.js",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://shoppinglist.wezeo.dev/cms/",
        changeOrigin: true,
      },
    },
  },
});
