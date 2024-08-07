import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from "react-router-dom";
import { WebLayout } from "../layouts/WebLayout";
import { darkThemeMui } from "../styles/themes/mui";
import { Home } from "./Home";
import { Services } from "./Services";

export const Router = () => {

  return (
    <ThemeProvider theme={darkThemeMui}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="services" element={<Services />}>
            <Route path=":section" element={<Services />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}