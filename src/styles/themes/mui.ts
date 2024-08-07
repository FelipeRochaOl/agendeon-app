import { createTheme } from "@mui/material";
import { defaultTheme } from "./default";

export const darkThemeMui = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: defaultTheme.blue,
      dark: defaultTheme.blue,
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 12,
  },
});
