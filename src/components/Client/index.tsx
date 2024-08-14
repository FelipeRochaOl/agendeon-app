import calendarAvailableIcon from "../../assets/calendar-512.png"
import starsIcon from "../../assets/star-512.png"
import phoneWhatsappIcon from "../../assets/whatsapp-512.png"
import { Container, GridClient, GridItem, GridItemCellPhone, GridItemName, GridItemPhone, GridItemStreet, PhoneWhatsapp, ScheduleAvailable, Stars } from "./styles"

export const Client = () => {
  return (
    <Container>
      <div className="avatar">
        <img src="https://randomuser.me/api/portraits/men/74.jpg" alt="John Doe - Cabeleireiro" />
      </div>
      <GridClient>
        <GridItemName>
          <strong>Nome:</strong>
          <span>John Doe</span>
        </GridItemName>
        <GridItem>
          <strong>Categoria:</strong>
          <span>Cabeleireiro</span>
        </GridItem>
        <GridItemStreet>
          <strong>Endereço:</strong>
          <span>Rua Manoel Matias, 23</span>
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
          <span>Vila Nova</span>
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
          <span>São Paulo</span>
        </GridItem>
        <GridItem>
          <strong>CEP:</strong>
          <span>11.211-023</span>
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