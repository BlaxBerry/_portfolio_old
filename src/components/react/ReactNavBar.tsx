import { useCallback, useState } from "react";
import { Drawer, IconButton, List, ListItem } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

function ReactNavBar() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const openDrawer = useCallback(
    () => setDrawerIsOpen(true),
    [setDrawerIsOpen],
  );
  const closeDrawer = useCallback(
    () => setDrawerIsOpen(false),
    [setDrawerIsOpen],
  );

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
            {/* <a href="/portfolio/contact">Contact</a> */}
          </div>

          <div style={{ flexGrow: 1 }} />

          <IconButton
            size="lg"
            className="flex rounded-full sm:hidden"
            onClick={openDrawer}
          >
            <Bars3Icon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </nav>
      </header>

      <Drawer
        placement="top"
        open={drawerIsOpen}
        onClose={closeDrawer}
        className="block sm:hidden"
      >
        <List className="bg-white">
          <a href="/portfolio/skills">
            <ListItem>Skills</ListItem>
          </a>

          <a href="/portfolio/works">
            <ListItem>Works</ListItem>
          </a>

          <a href="/portfolio/contact">
            <ListItem>Contact</ListItem>
          </a>
        </List>
      </Drawer>
    </>
  );
}

export default ReactNavBar;
