import { useNavigate } from "react-router-dom"
import calendarAvailableIcon from "../../assets/calendar-512.png"
import companhiaImg from "../../assets/companhia.png"
import starsIcon from "../../assets/star-512.png"
import phoneWhatsappIcon from "../../assets/whatsapp-512.png"
import { Company } from "../../interfaces/Company"
import { Container, GridClient, GridItem, GridItemCellPhone, GridItemName, GridItemPhone, GridItemStreet, PhoneWhatsapp, ScheduleAvailable, Stars } from "./styles"

export const Client = (props: Company) => {
  const navigate = useNavigate()
  const handleOpenSchedulePage = () => {
    navigate(`/schedule/client/${props.id}`)
  }
  return (
    <Container onClick={handleOpenSchedulePage}>
      <div className="avatar">
        <img src={companhiaImg} alt={props.name} />
      </div>
      <GridClient>
        <GridItemName>
          <strong>Nome:</strong>
          <span>{props.name}</span>
        </GridItemName>
        <GridItem>
          <strong>Categoria:</strong>
          <span>{props.category.name}</span>
        </GridItem>
        <GridItemStreet>
          <strong>Endereço:</strong>
          <span>{props.address.street}</span>
        </GridItemStreet>
        <GridItemPhone>
          <strong>Telefone:</strong>
          <span>(11) 3233-7799</span>
        </GridItemPhone>
        <GridItem>
          <strong>Agenda:</strong>
          <ScheduleAvailable>
            <span>Disponível</span>
            <img src={calendarAvailableIcon} alt="Agenda disponível" width={20} />
          </ScheduleAvailable>
        </GridItem>
        <GridItem>
          <strong>Bairro:</strong>
          <span>{props.address.neighborhood}</span>
        </GridItem>
        <GridItem>
          <strong>Distrito:</strong>
          <span>-</span>
        </GridItem>
        <GridItemCellPhone>
          <strong>Celular:</strong>
          <PhoneWhatsapp>
            <span>(11) 99876-7799</span>
            <img src={phoneWhatsappIcon} alt="Celular com WhatsApp" width={20} />
          </PhoneWhatsapp>
        </GridItemCellPhone>
        <GridItem>
          <strong>Cidade:</strong>
          <span>{props.address.city}</span>
        </GridItem>
        <GridItem>
          <strong>CEP:</strong>
          <span>{props.address.zip}</span>
        </GridItem>
        <GridItem>
          <strong>Email:</strong>
          <span>johndoe@barber.com</span>
        </GridItem>
        <GridItem>
          <strong>Avaliações:</strong>
          <Stars>
            <img src={starsIcon} alt="1 estrelas" width={20} />
            <img src={starsIcon} alt="2 estrelas" width={20} />
            <img src={starsIcon} alt="3 estrelas" width={20} />
            <img src={starsIcon} alt="4 estrelas" width={20} />
            <img src={starsIcon} alt="5 estrelas" width={20} />
          </Stars>
        </GridItem>
      </GridClient>
    </Container>
  )
}