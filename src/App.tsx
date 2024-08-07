import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { Router } from "./pages/Router"
import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

export interface User {
  id: string
  email: string
  createdAt: string[]
}

export interface Client {
  id: string
  name: string
  cpf: string
  age: number
  user: User
  createdAt: string[]
  deleted: boolean
}



function App() {

  const getUsers = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/users/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: User[] = await response.json()
    console.log(data)
  }

  const getClients = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/clients/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: Client[] = await response.json()
    console.log(data)
  }

  useEffect(() => {
    getUsers()
    getClients()
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider >
  )
}

export default App
