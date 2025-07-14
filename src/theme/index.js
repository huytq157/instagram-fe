
import { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import palette from "./palette";
import typography from './typography';
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";


export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      shape: { borderRadius: 6 },
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
