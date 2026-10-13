import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Base path.
 * The site is a single page that navigates with #anchors, so a relative base ("./")
 * works at a root domain (abdallahhessam.github.io) AND under a project path
 * (abdallahhessam.github.io/portfolio/) without changes.
 * To force an absolute base, build with:  BASE_PATH=/your-repo-name/ npm run build
 */
export default defineConfig({
  base: process.env.BASE_PATH ?? "./",
  plugins: [react()],
  build: { target: "es2020", assetsInlineLimit: 0 },
});
