import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        format: "umd",
      },
    },
  },
});
