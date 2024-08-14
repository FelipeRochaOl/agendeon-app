import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { GlobalProvider } from "./context/GlobalContext"
import { Router } from "./pages/Router"
import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalProvider>
          <Router />
        </GlobalProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider >
  )
}

export default App
