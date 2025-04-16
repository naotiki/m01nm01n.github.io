import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://m01nm01n.github.io",
  integrations: [mdx(), sitemap()],
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
