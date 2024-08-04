// theme.js
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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

