import type { languages } from "./lang";

type UILabel = null;

export const uiLabel: Record<string, UILabel> = {
  ja: null,
  en: null,
} satisfies Record<keyof typeof languages, UILabel>;
