import { memo, useCallback, useEffect } from "react";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import type { Language } from "src/types/firestore";
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  TRANSLATIONS,
} from "src/constants";

function ReactLangsSwitcher() {
  const { language } = useStore($store);

  useEffect(() => {
    if (!language) $store.setKey("language", DEFAULT_LANGUAGE);
  }, [language]);

  const message = TRANSLATIONS[language]?.components;

  const onClick = useCallback((lang: Language) => {
    $store.setKey("language", lang);
  }, []);

  return (
    <Menu>
      <MenuHandler>
        <IconButton size="lg" className="hidden bg-transparent sm:flex">
          <LanguageIcon className="h-5 w-5" />
        </IconButton>
      </MenuHandler>

      <MenuList>
        {AVAILABLE_LANGUAGES.map((lang) => (
          <MenuItem
            key={lang}
            className="hidden items-center sm:flex"
            onClick={() => onClick(lang)}
            style={{
              background: lang === language ? "#eee" : "transparent",
            }}
          >
            <img
              src={`/portfolio/assets/svgs/flag-${lang}.svg`}
              className="h-5 w-5"
            />
            <Typography variant="small" className="ml-5 font-medium">
              {message?.language?.[lang] ?? "..."}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

const ReactLangsSwitcherMemo = memo(ReactLangsSwitcher);
export default ReactLangsSwitcherMemo;
