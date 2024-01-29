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
      input: {
        main: "/src/plugins/app/_config/main.js",
        custom: "index.html",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://shoppinglist.wezeo.dev/cms/",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
  },
});
