
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { Container } from "./styles";

export const Header = () => {
  return (
    <Container>
      <img src={logo} alt="Logo" />
      <NavLink to="/login" className="logout">
        <img src="https://randomuser.me/api/portraits/men/74.jpg" alt="Avatar" />
        <span>John Doe</span>
      </NavLink>
    </Container>
  );
}