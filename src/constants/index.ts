import type { Language } from "src/types/firestore";
import translationEN from "src/translations/en.json";
import translationJA from "src/translations/ja.json";

export const NAVIGATION_LINKS: string[] = ["skills", "works", "contact"];

export const OUTSIDE_LINKS: Array<{ name: string; href: string }> = [
  {
    name: "github",
    href: "https://github.com/BlaxBerry/portfolio",
  },
  {
    name: "twitter",
    href: "https://twitter.com/chenjiaxu333",
  },
];

export const DEFAULT_LANGUAGE: Language = "en";

export const AVAILABLE_LANGUAGES: Language[] = ["en", "ja"];

export const TRANSLATIONS: Record<Language, any> = {
  en: translationEN,
  ja: translationJA,
};
