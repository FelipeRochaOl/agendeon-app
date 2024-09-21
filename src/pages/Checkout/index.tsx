import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import confirmIcon from "../../assets/confirm.png"
import { BackButton } from "../../components/Back"
import { Button } from "../../components/Button"
import { Client } from "../../components/Client"
import { Service } from "../../components/Service"
import { ConfirmMessage, Container, ContainerConfirm, ServiceForm } from "./styles"

export const Checkout = () => {
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit } = useForm()

  const onSubmit = () => {
    setConfirm(true);
  }

  const handleNavigate = () => {
    setConfirm(false)
    navigate('/services');
  }

  return (
    <Container>
      <BackButton />
      <Client />
      <ServiceForm onSubmit={handleSubmit(onSubmit)}>
        <Service date="21 de setembro de 2024" price="R$ 60,00" service="Corte Masculino" time="09:00hs" />
        <center>
          <Button type="submit" color="green">Confirmar R$ 160,00</Button>
        </center>
      </ServiceForm>
      <ContainerConfirm $display={confirm} onClick={handleNavigate}>
        <ConfirmMessage>
          <img src={confirmIcon} alt="Agendamento confirmado" width={50} />
          <span>Agendamento confirmado com sucesso!</span>
        </ConfirmMessage>
      </ContainerConfirm>
    </Container>
  )
}