import {
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./App.scss";
import WeatherPage from "./components/pages/WeatherPage";
import { getDesignTokens } from "./styles/theme";
import { useMemo, useState } from "react";
import { ColorContext } from "./types/ColorContext";
import SwitchModeButton from "./components/ui/buttons/SwitchModeButton";
import Footer from "./components/footer/Footer";

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
      <div className="app">
        <ColorContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <SwitchModeButton />
            <WeatherPage />
          </ThemeProvider>
        </ColorContext.Provider>
      </div>
      <Footer />
    </StyledEngineProvider>
  );
}

export default App;
