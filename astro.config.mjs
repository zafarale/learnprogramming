// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://zafarale.github.io',  // Replace with your GitHub username
  base: '/learnprogramming',  // Replace with your repository name
  vite: {
    plugins: [tailwindcss()],
  },
});
