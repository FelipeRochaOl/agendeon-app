import { IconButton } from "@mui/material"
import { MdDelete } from "react-icons/md"
import calendarAvailableIcon from "../../assets/calendar-512.png"
import { Container, GridItem, GridItemService, GridService, ScheduleAvailable } from "./styles"

interface IServiceProps {
  date: string
  time: string
  service: string
  price: string
}

export const Service = (props: IServiceProps) => {
  return (
    <Container>
      <GridService>
        <GridItemService>
          <strong>Serviço:</strong>
          <span>{props.service}</span>
        </GridItemService>
        <GridItem>
          <ScheduleAvailable>
            <img src={calendarAvailableIcon} alt="Agenda disponível" width={25} />
            <strong>Agendado para dia:</strong>
          </ScheduleAvailable>
          <span>{props.date} às {props.time}</span>
        </GridItem>
        <GridItem>
          <span>{props.price}</span>
        </GridItem>
        <GridItem>
          <IconButton color="error" aria-label="Deletar">
            <MdDelete onClick={() => console.log('delete')} />
          </IconButton>
        </GridItem>
      </GridService>
    </Container>
  )
}