import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";

export const BackButton = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <Container onClick={handleGoBack}>
      <MdArrowBackIos size={20} />
      <strong>Voltar</strong>
    </Container>
  )
}