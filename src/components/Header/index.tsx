import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Container } from "./styles";

export const Header = () => {
  const [isLogged, setIsLogged] = useState(true);
  useEffect(() => {
    setIsLogged(true);
  }, [])
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
      {isLogged
        ? <NavLink to="/dashboard" className="logout">
          <img src="https://randomuser.me/api/portraits/thumb/men/75.jpg" alt="Avatar" />
          <span>John Doe</span>
        </NavLink>
        : <NavLink to="/login" className="login">Entrar</NavLink>}
    </Container>
  );
}