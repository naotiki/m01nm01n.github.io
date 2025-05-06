import type { Image, Root } from "mdast";
import { visit } from "unist-util-visit";
// 画像サイズ指定用remarkプラグイン
export function remarkImageSizePlugin() {
  return (tree: Root) => {
    const extendedImageRegex = /^(?<alt>.*) "(?<style>.+=.+(;.+=.+)?)"$/gm;
    visit(tree, "image", (node) => {
      if (!node.alt) return;

      extendedImageRegex.lastIndex = 0;
      const matches = extendedImageRegex.exec(node.alt);
      if (!matches || !matches?.groups) return;
      const { alt, style } = matches.groups;
      Object.assign(node, {
        alt,
        data: {
          hProperties: {
            style: style.replaceAll("=", ":"),
          },
        },
      } satisfies Partial<Image>);
    });
  };
}
