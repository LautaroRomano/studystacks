import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    main: {
      800: "#E7F3FF",
      700: "#DBE7F2",
      600: "#77A7FF",
      500: "#0571ED",
      400: "#2851A3",
      300: "#1D3C78",
    },
    gray: {
      900: "#ECF3FF",
      700: "#F2F3F5",
      600: "#CCCCCC",
      500: "#444950",
    },
    black: {
      500: "#1D1F23",
    },
    warning: {
      500: "#F7B928",
    },
    succes: {
      500: "#45BD62",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
