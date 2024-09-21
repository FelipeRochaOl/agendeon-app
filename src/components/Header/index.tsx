import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { Container } from "./styles";

export const Header = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>Serviços</NavLink>
          </li>
        </ul>
      </nav>
      {isAuthenticated
        ? <NavLink to="/dashboard" className="logout">
          <img src="https://randomuser.me/api/portraits/thumb/men/75.jpg" alt="Avatar" />
          <span>Felipe Rocha</span>
        </NavLink>
        : <NavLink to="/login" className="login">Entrar</NavLink>}
    </Container>
  );
}