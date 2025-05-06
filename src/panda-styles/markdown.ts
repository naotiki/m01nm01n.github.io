import { type GlobalStyleObject, defineStyles } from "@pandacss/dev";
import { markdownHeadingsAnchorClassName } from "./const";
import { c } from "./utils";

export const markdownStyle = {
  ":is(h1, h2, h3, h4, h5, h6)>a:first-child": {
    _before: {
      content: '"#"',
      color: {
        base: "gray.300",
        _dark: "gray.600",
      },
    },
    _hover: {
      textDecoration: "{colors.border} underline",
    },
  },
  [`a:not(${c(markdownHeadingsAnchorClassName)})`]: {
    textDecoration: "none",
    color: "link",
    _hover: {
      textDecoration: "{colors.link} underline",
    },
  },
  table: {
    borderCollapse: "collapse",
    margin: "1rem 0",
    borderRadius: "1rem",
    border: "1px solid {colors.border}",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "{colors.secondaryBackground}",
  },
  "th, td": {
    padding: "0.5rem 1rem",
    border: "1px solid {colors.border}",
    textAlign: "left",
    fontSize: "sm",
    lineHeight: "1.5",
    color: "text",
  },
  "ul, ol": {
    listStylePosition: "inside",
  },
  // - [x]の回避
  "ul:not(:has(input))": {
    listStyleType: "disc",
  },
  ol: {
    listStyleType: "decimal",
  },
  "ul ul, ol ul": {
    listStyleType: "circle",
    listStylePosition: "inside",
    marginLeft: "5",
  },
  "ol ol, ul ol": {
    listStyleType: "lower-latin",
    listStylePosition: "inside",
    marginLeft: "5",
  },
  ".expressive-code": {
    margin: { base: "2", md: "5" },
  },
  img: {
    margin: "2",
  },
  ":not(pre) > code": {
    color: "red.500",
    backgroundColor: "{colors.slate.500/20}",
    padding: "1",
    borderRadius: "0.5rem",
  },
  // Note (Aside)
  /**
   * :::note_(warn|info|alert|success)
   *
   * :::
   */
  ".note": {
    padding: "1rem",
    borderRadius: "0.5rem",
    fontSize: "sm",
    lineHeight: "1.5",
    margin: "{spacing.2} 0",
  },
  ".note.warn": {
    backgroundColor: "{colors.amber.500/20}",
    borderLeft: "0.5rem solid {colors.amber.500}",
  },
  ".note.info": {
    backgroundColor: "{colors.blue.400/20}",
    borderLeft: "0.5rem solid {colors.blue.400}",
  },
  ".note.alert": {
    backgroundColor: "{colors.red.400/20}",
    borderLeft: "0.5rem solid {colors.red.400}",
  },
  ".note.success": {
    backgroundColor: "{colors.green.400/20}",
    borderLeft: "0.5rem solid {colors.green.400}",
  },
} satisfies GlobalStyleObject;
