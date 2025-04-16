import { defaultLanguage, languages } from "./lang";
import { uiLabel } from "./ui";

export function getUITranslations(
  lang: keyof typeof languages | string | undefined
) {
  return lang ? uiLabel[lang] : uiLabel[defaultLanguage];
}
