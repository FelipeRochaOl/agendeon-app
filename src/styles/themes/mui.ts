import { createTheme } from "@mui/material";
import { ptBR } from "@mui/x-date-pickers/locales";
import { defaultTheme } from "./default";

export const darkThemeMui = createTheme(
  {
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
  },
  ptBR
);
