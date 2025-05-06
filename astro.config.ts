import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { h } from "hastscript";
import rehypeAutolinkHeadings, { type Options } from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";

import { defineConfig } from "astro/config";

import path from "node:path";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import GithubSlugger from "github-slugger";
import type { Root as HRoot } from "hast";
import { headingRank } from "hast-util-heading-rank";
import { toString as hastToString } from "hast-util-to-string";
import type { Root as MRoot, Node, Text } from "mdast";
import { remarkImageSizePlugin } from "remark-image-extended";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
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
      //rehypeSlug,
      [
        groupingSlug,
        {
          group(file) {
            if (!file.dirname) return undefined;
            const relativePath = path.relative(file.cwd, file.dirname);
            if (
              path.matchesGlob(relativePath, "src/content/contests/*/writeup")
            ) {
              return relativePath;
            }
            return undefined;
          },
        } satisfies GroupSlugOptions,
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: [markdownHeadingsAnchorClassName] },
        } satisfies Options,
      ],
      rehypeKatex,
    ],
    remarkPlugins: [
      remarkDirective,
      appDirectivePlugin,
      remarkImageSizePlugin,
      remarkBreaks,
      remarkMath,
    ],
  },
});

function appDirectivePlugin() {
  return (tree: MRoot) => {
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

interface GroupSlugOptions {
  group?(file: VFile): string | undefined;
}

const defaultSlugs = new GithubSlugger();
const slagsMap = new Map<string, GithubSlugger>();
function groupingSlug(options: GroupSlugOptions) {
  return (tree: HRoot, file: VFile) => {
    let slugs = defaultSlugs;
    const group = options.group?.(file);
    if (group !== undefined) {
      if (!slagsMap.has(group)) {
        slagsMap.set(group, new GithubSlugger());
      }
      slugs = slagsMap.get(group) ?? defaultSlugs;
    } else {
      defaultSlugs.reset();
    }

    visit(tree, "element", (node) => {
      if (headingRank(node) && !node.properties.id) {
        node.properties.id = slugs.slug(hastToString(node));
      }
    });
  };
}
