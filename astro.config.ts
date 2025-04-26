import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";

import { defineConfig } from "astro/config";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import type { Node, Root, Text } from "mdast";
import { visit } from "unist-util-visit";
import { markdownHeadingsAnchorClassName } from "./src/panda-styles/const";
// https://astro.build/config
export default defineConfig({
  site: "https://m01nm01n.github.io",
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers()],
    }),
    mdx(),
    sitemap(),
    icon(),
  ],
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
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: [markdownHeadingsAnchorClassName] },
        },
      ],
      rehypeKatex,
    ],
    remarkPlugins: [
      remarkDirective,
      myDirectivePlugin,
      remarkBreaks,
      remarkMath,
    ],
  },
});

function myDirectivePlugin() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (node.type === "textDirective") {
        (node as Node).type = "text";
        (node as Node as Text).value = `:${node.name}`;
      }
      if (node.type === "containerDirective" || node.type === "leafDirective") {
        const [name, ...n] = node.name.split("_");
        let value: string | null = null;
        if (n.length > 0) {
          value = n.join(" ");
        } else {
          value = null;
        }
        switch (name) {
          case "note": {
            if (!node.attributes) return;
            node.attributes.class = `note ${value ?? "warn"}`;
            if (!node.data) {
              node.data = {};
            }
            const tagName = "div";

            node.data.hName = tagName;

            node.data.hProperties = h(tagName, node.attributes).properties;
            break;
          }

          default:
            break;
        }
      }
    });
  };
}
