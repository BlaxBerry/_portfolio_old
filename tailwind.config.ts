import withMT from "@material-tailwind/react/utils/withMT";
import type { Config } from "tailwindcss";

const configs: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default withMT(configs);
