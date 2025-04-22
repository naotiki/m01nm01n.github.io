import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import { globalStyles } from "./src/panda-styles/index";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{ts,tsx,js,jsx,astro}",
    "./pages/**/*.{ts,tsx,js,jsx,astro}",
  ],

  // Files to exclude
  exclude: [],
  conditions: {
    dark: ".dark &",
    markdown: ".markdown &",
  },
  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          text: {
            value: {
              base: "#000",
              _dark: "{colors.white}",
            },
          },
          background: {
            value: {
              base: "#FFF",
              _dark: "{colors.gray.900}",
            },
          },
          border: {
            value: {
              base: "{colors.gray.200}",
              _dark: "{colors.slate.700}",
            },
          },
          link: {
            value: {
              base: "{colors.blue.500}",
              _dark: "{colors.blue.300}",
            },
          },
          secondaryBackground: {
            value: {
              base: "{colors.gray.50}",
              _dark: "{colors.gray.800}",
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  globalCss: globalStyles,
});
