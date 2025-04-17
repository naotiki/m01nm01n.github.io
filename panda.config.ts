import { defineConfig } from "@pandacss/dev";

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

  globalCss: {
    h1: {
      fontSize: "39px",
      mt: "1rem",
      lineHeight: 1.4,
    },
    h2: {
      fontSize: "31px",
      mt: "1rem",
      lineHeight: 1.4,
    },
    h3: {
      fontSize: "25px",
      mt: "1rem",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "20px",
      mt: "1rem",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "15px",
      mt: "1rem",
      lineHeight: 1.4,
    },
    strong: {
      fontWeight: 900,
    },
    b: {
      fontWeight: 900,
    },
    section: {
      display: "block",
      "& ol": {
        listStyle: "decimal",
      },
    },
    blockquote: {
      borderLeft: "0.25rem solid #ddd",
      pl: "1rem",
      mt: "0.5rem",
      fontSize: "1.333em",
    },
    ul: {
      mt: "1rem",
      ml: "1rem",
      listStyle: "inside",
      "& ul": {
        mt: 0,
      },
    },
    ol: {
      mt: "1rem",
      ml: "1rem",
      listStyle: "decimal inside",
      "& ul": {
        mt: 0,
      },
    },
    table: {
      width: "100%",
    },
    thread: {
      display: "table",
      verticalAlign: "middle",
      borderSpacing: "2px",
    },
    tr: {
      display: "table-row",
      verticalAlign: "inherit",
      borderColor: "inherit",
      border: "1px solid",
    },
    th: {
      display: "table-cell",
      verticalAlign: "inherit",
      fontWeight: "bold",
      textAlign: "internal center",
      border: "1px solid",
    },
    td: {
      display: "table-cell",
      verticalAlign: "inherit",
      textAlign: "center",
      border: "1px solid",
    },
    hr: {
      mt: "1.0rem",
      border: "none",
      borderTop: "1px solid #ddd",
    },
    article: {
      sup: {
        a: {
          color: "accent",
          fontWeight: "bold",
          ml: "0.1rem",
        },
      },
      p: {
        mt: "1.0rem",
        _first: {
          mt: 0,
        },
      },
      em: {
        fontStyle: "italic",
      },
      code: {
        fontFamily: "code",
        fontSizes: "xx-large",
        backgroundColor: { base: "#e1e1e1", _dark: "#1A1A1A" },
        px: "0.3rem",
        py: "0.1rem",
        mx: "0.2rem",
        borderRadius: "0.3rem",
      },
      pre: {
        fontFamily: "code",
        "& > code": { all: "unset" },
        _dark: {
          "& > code": { all: "unset" },
        },
        my: "1.5rem",
        p: "1.5rem",
        borderRadius: "1.0rem",
      },
      mark: {
        backgroundColor: "#c085ff",
        px: "0.3rem",
      },
    },
  },
});
