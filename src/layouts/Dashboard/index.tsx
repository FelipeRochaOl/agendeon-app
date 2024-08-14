import { Outlet } from "react-router-dom"
import { Header } from "../../components/Dashboard/Header"
import { Menu } from "../../components/Dashboard/Menu"
import { Container, Content } from "./styles"

export const DashboardLayout = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Menu />
        <Outlet />
      </Content>
    </Container>
  )
}