import type { Language } from "src/types/firestore";

export const NAVIGATION_LINKS: Array<{ id: string; name: string }> = [
  { id: "skills", name: "Skills" },
  { id: "works", name: "Works" },
  { id: "contact", name: "Contact Me" },
];

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

export const LANGUAGES: Array<{ name: Language }> = [
  { name: "en" },
  { name: "ja" },
];
