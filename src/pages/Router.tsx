import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from '../layouts/Dashboard';
import { WebLayout } from "../layouts/WebLayout";
import { darkThemeMui } from "../styles/themes/mui";
import { Category } from './Dashboard/Category';
import { Session } from './Dashboard/Session';
import { Home } from "./Home";
import { Schedule } from './Schedule';
import { Services } from "./Services";

export const Router = () => {

  return (
    <ThemeProvider theme={darkThemeMui}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="services" element={<Services />}>
            <Route path=":section" element={<Services />}>
              <Route path=":category" element={<Services />} />
            </Route>
          </Route>
          <Route path="schedule/:client" element={<Schedule />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="session" element={<Session />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}