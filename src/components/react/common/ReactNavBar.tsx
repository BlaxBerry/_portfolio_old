import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import { DEFAULT_LANGUAGE, TRANSLATIONS } from "src/constants";
import { NAVIGATION_LINKS, OUTSIDE_LINKS } from "src/constants";
import ReactLangsSwitcherMemo from "./ReactLangsSwitcher";
import { useEffect } from "react";

function ReactNavBar() {
  const { language } = useStore($store);

  useEffect(() => {
    if (!language) $store.setKey("language", DEFAULT_LANGUAGE);
  }, [language]);

  const message = TRANSLATIONS[language]?.components;

  return (
    <>
      <header>
        <nav className="flex h-full items-center justify-center px-4">
          {/* title */}
          <a href="/portfolio" className="mr-6">
            <h1 className="text-2xl font-bold">Portfolio</h1>
          </a>

          {/* navigation */}
          <div className="hidden space-x-4 sm:flex">
            {NAVIGATION_LINKS.map((item) => (
              <a key={item} href={`/portfolio/${item}`}>
                {message?.nav?.[item]}
              </a>
            ))}
          </div>

          <div style={{ flexGrow: 1 }} />

          <ReactLangsSwitcherMemo />

          {/* mobile screen menu */}
          <Menu>
            <MenuHandler>
              <IconButton size="lg" className="flex bg-transparent sm:hidden">
                <Bars3Icon className="h-5 w-5" />
              </IconButton>
            </MenuHandler>

            <MenuList className="block w-full sm:hidden">
              {NAVIGATION_LINKS.map((item) => (
                <a key={item} href={`/portfolio/${item}`}>
                  <MenuItem className="text-center">{item}</MenuItem>
                </a>
              ))}
              <hr className="my-3" />
              <div className="flex justify-center space-x-4 hover:border-transparent">
                {OUTSIDE_LINKS.map(({ name, href }) => (
                  <a key={name} href={href} rel="noopener" target="_blank">
                    <img
                      src={`/portfolio/assets/svgs/link-${name}.svg`}
                      alt="github"
                      className="h-8 w-8"
                    />
                  </a>
                ))}
              </div>
            </MenuList>
          </Menu>
        </nav>
      </header>
    </>
  );
}

export default ReactNavBar;
