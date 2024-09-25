import { useNavigate } from "react-router-dom"
import cachorroImg from "../../assets/cachorro.png"
import calendarAvailableIcon from "../../assets/calendar-512.png"
import { Container, GridItem, GridUser, ScheduleAvailable } from "./styles"

interface IUserProps {
  name: string
  date: string
  time: string
  service: string
  price: string
}

export const User = (props: IUserProps) => {
  const navigate = useNavigate()
  const handleOpenSchedulePage = () => {
    navigate('/services')
  }
  return (
    <Container onClick={handleOpenSchedulePage}>
      <div className="avatar">
        <img src={cachorroImg} alt={`${props.name} - Usuário`} />
      </div>
      <GridUser>
        <GridItem>
          <strong>Nome:</strong>
          <span>{props.name}</span>
        </GridItem>
        <GridItem>
          <strong>Telefone:</strong>
          <span>(11) 3233-7799</span>
        </GridItem>
        <GridItem>
          <strong>Serviço:</strong>
          <span>{props.service} - {props.price}</span>
        </GridItem>
        <GridItem>
          <strong>Agenda:</strong>
          <ScheduleAvailable>
            <span>Agendado para {props.date}</span>
            <img src={calendarAvailableIcon} alt="Agenda disponível" width={20} />
          </ScheduleAvailable>
        </GridItem>
        <GridItem>
          <strong>Horário:</strong>
          <span>{props.time}</span>
        </GridItem>
      </GridUser>
    </Container>
  )
}