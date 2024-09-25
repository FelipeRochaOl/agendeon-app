import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cachorroImg from '../../../assets/cachorro.png';
import companhiaImg from '../../../assets/companhia.png';
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../context/AuthContext";
import { CompanyContext } from "../../../context/CompanyContext";
import { Container } from "./styles";

export const Header = () => {
  const navigate = useNavigate()
  const { company } = useContext(CompanyContext)
  const { isAuthenticated, username } = useContext(AuthContext)

  const handleHome = () => {
    if (isAuthenticated) {
      return navigate('/services')
    }
    return navigate('/')
  }

  return (
    <Container>
      <img src={logo} alt="Logo" onClick={handleHome} />
      <NavLink to="/" className="logout">
        <img src={company ? companhiaImg : cachorroImg} alt="Avatar" />
        <span>{username}</span>
      </NavLink>
    </Container>
  );
}