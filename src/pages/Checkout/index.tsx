import { BackButton } from "../../components/Back"
import { Client } from "../../components/Client"
import { Container } from "./styles"

export const Checkout = () => {
  return (
    <Container>
      <BackButton />
      <Client />
    </Container>
  )
}