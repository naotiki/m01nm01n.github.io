import fs from "node:fs/promises";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { remarkImageSizePlugin } from "./plugin.js";
const document = await fs.readFile("input.md", "utf8");

const file = await remark()
  .use(remarkGfm)
  .use(remarkImageSizePlugin)
  .process(document);

await fs.writeFile("output.md", String(file));
