import type { languages } from "./lang";

type UILabel = {};

export const uiLabel: Record<string, UILabel> = {
  ja: {},
  en: {},
} satisfies Record<keyof typeof languages, UILabel>;
