import { Link } from "react-router-dom";
import homeSvg from "../../assets/home.svg";
import { Container, ImageSection, TextSection, Title } from "./styles";

export const Home = () => {
  return (
    <Container>
      <TextSection>
        <div>
          <h4>Bem vindo!</h4>
          <Title><span>Agende</span> serviços de forma simples <span>on</span>line.</Title>
          <p>Aqui você pode agendar o serviço desejado de forma simples</p>
          <p>Para você que é um prestador de serviço, faça parte do nosso time e ofereça seus serviços através de nossa plataforma, disponibilize e acompanhe sua agenda de forma online</p>
        </div>
        <Link to="/serviços">Encontrar</Link>
      </TextSection>
      <ImageSection>
        <img src={homeSvg} alt="Home" width={804} />
      </ImageSection>
    </Container>
  );
}