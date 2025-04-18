import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://m01nm01n.github.io",
  integrations: [mdx(), sitemap(), icon()],
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
  },
  experimental: {
    fonts: [
      /* {
        provider: fontProviders.google(),
        name: "Roboto",
        cssVariable: "--font-roboto"
      } */
    ],
  },
});
