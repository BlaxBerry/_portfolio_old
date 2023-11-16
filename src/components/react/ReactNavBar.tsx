import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

function ReactNavBar() {
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
            <a href="/portfolio/skills">Skills</a>
            <a href="/portfolio/works">Works</a>
            <a href="/portfolio/contact">Contact Me</a>
          </div>

          <div style={{ flexGrow: 1 }} />

          {/* mobile screen menu */}
          <Menu>
            <MenuHandler>
              <IconButton size="lg" className="flex bg-transparent sm:hidden">
                <Bars3Icon className="h-5 w-5" />
              </IconButton>
            </MenuHandler>

            <MenuList className="block w-full sm:hidden">
              <a href="/portfolio/skills">
                <MenuItem>Skills</MenuItem>
              </a>
              <a href="/portfolio/works">
                <MenuItem>Works</MenuItem>
              </a>
              <a href="/portfolio/contact">
                <MenuItem>Contact Me</MenuItem>
              </a>

              <hr className="my-3" />

              <a
                href="https://github.com/BlaxBerry/portfolio"
                rel="noopener"
                target="_blank"
              >
                <MenuItem>Github</MenuItem>
              </a>
              <MenuItem disabled>Theme</MenuItem>
              <MenuItem disabled>Langs</MenuItem>
            </MenuList>
          </Menu>
        </nav>
      </header>
    </>
  );
}

export default ReactNavBar;
