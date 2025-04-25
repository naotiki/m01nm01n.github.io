import { defineGlobalStyles } from "@pandacss/dev";
import { markdownClassName } from "./const";
import { markdownStyle } from "./markdown";
import { c } from "./utils";

export const globalStyles = defineGlobalStyles({
  h1: {
    fontSize: "5xl",
    mt: "1rem",
    lineHeight: 1.4,
  },
  h2: {
    fontSize: "4xl",
    mt: "1rem",
    lineHeight: 1.4,
  },
  h3: {
    fontSize: "3xl",
    mt: "1rem",
    lineHeight: 1.4,
  },
  h4: {
    fontSize: "2xl",
    mt: "1rem",
    lineHeight: 1.4,
  },
  h5: {
    fontSize: "xl",
    mt: "1rem",
    lineHeight: 1.4,
  },
  h6: {
    fontSize: "lg",
    mt: "1rem",
    lineHeight: 1.4,
  },
  [c(markdownClassName)]: markdownStyle,
});
