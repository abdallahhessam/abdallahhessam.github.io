import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

/** Single-file build used only for the hosted preview. Not needed for GitHub Pages. */
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  publicDir: false,
  build: { outDir: "dist-preview", assetsInlineLimit: 100_000_000, cssCodeSplit: false },
});
