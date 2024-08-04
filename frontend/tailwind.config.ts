import type { Config } from "tailwindcss";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Accordion: {
      baseStyle: {
        container: {
          borderTopWidth: "0px",
          _last: {
            borderBottomWidth: "0px",
          },
        },
        button: {
          _hover: {
            bg: "blue.500",
            color: "white",
          },
          _expanded: {
            bg: "blue.500",
            color: "white",
          },
        },
      },
    },
  },
});

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
