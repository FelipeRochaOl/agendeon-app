import { useContext } from "react";
import { NavLink } from "react-router-dom";
import cachorroImg from '../../assets/cachorro.png';
import companhiaImg from '../../assets/companhia.png';
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { CompanyContext } from "../../context/CompanyContext";
import { Container } from "./styles";


export const Header = () => {
  const { company } = useContext(CompanyContext)
  const { isAuthenticated, username } = useContext(AuthContext)

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
          <img src={company ? companhiaImg : cachorroImg} alt="Avatar" />
          <span>{username}</span>
        </NavLink>
        : <NavLink to="/login" className="login">Entrar</NavLink>}
    </Container>
  );
}