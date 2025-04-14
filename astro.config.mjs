// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://zafarale.github.io',  // Replace with your GitHub username
  base: '/learn_programming',  // Match your repository name exactly
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
