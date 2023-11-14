import type { ReactNode } from "react";
import pkg from "@material-tailwind/react";

const { ThemeProvider: MTThemeProvider } = pkg;

function ReactThemeProvider(props: { children: ReactNode }) {
  return <MTThemeProvider>{props.children}</MTThemeProvider>;
}

export default ReactThemeProvider;
