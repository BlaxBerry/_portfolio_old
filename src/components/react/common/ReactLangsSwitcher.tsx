import { memo, useCallback } from "react";
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
import { LANGUAGES } from "src/constants";

function ReactLangsSwitcher() {
  const { language } = useStore($store);

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
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.name}
            className="hidden items-center sm:flex"
            onClick={() => onClick(lang.name)}
            style={{
              background: lang.name === language ? "#eee" : "transparent",
            }}
          >
            <img
              src={`/portfolio/assets/svgs/flag-${lang.name}.svg`}
              className="h-5 w-5"
            />
            <Typography variant="small" className="ml-5 font-medium">
              {lang.name}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

const ReactLangsSwitcherMemo = memo(ReactLangsSwitcher);
export default ReactLangsSwitcherMemo;
