import {
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { getDesignTokens } from "./styles/theme";
import { useMemo, useState } from "react";
import { ColorContext } from "./types/ColorContext";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // const theme = useMemo(
  //   () => createTheme(mode === "light" ? lightTheme : darkTheme),
  //   [mode]
  // );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ColorContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Header />
          <CssBaseline enableColorScheme />
          <Main />
          <Footer />
        </ThemeProvider>
      </ColorContext.Provider>
    </StyledEngineProvider>
  );
}

export default App;
