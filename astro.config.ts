import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://astronaut.github.io",
  base: "/portfolio",

  integrations: [react(), tailwind()],
});
