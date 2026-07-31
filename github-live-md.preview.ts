import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import remarkDirective from "remark-directive";
import remarkGemoji from "remark-gemoji";
import { remarkImageSizePlugin } from './remark-image-extended/index.ts'

export default {
	remarkPlugins: [
    remarkDirective,
    appDirectivePlugin,
		remarkImageSizePlugin,
		remarkBreaks,
		remarkMath,
    remarkGemoji
	],
	rehypePlugins: [
		rehypeSlug,
		rehypeAutolinkHeadings,
		rehypeKatex,
	],
}

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
