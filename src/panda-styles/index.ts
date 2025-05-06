import { defineGlobalStyles } from "@pandacss/dev";
import { markdownClassName } from "./const";
import { markdownStyle } from "./markdown";
import { c } from "./utils";

export const globalStyles = defineGlobalStyles({
  h1: {
    fontSize: "4xl",
  },
  h2: {
    fontSize: "3xl",
  },
  h3: {
    fontSize: "2xl",
  },
  h4: {
    fontSize: "xl",
  },
  h5: {
    fontSize: "lg",
  },
  h6: {
    fontSize: "md",
  },
  "h1, h2, h3, h4, h5, h6": {
    fontWeight: "bold",
    mt: "1rem",
    lineHeight: 1.4,
  },
  [c(markdownClassName)]: markdownStyle,
});
