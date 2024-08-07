import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button/Button"
import TextField from "@mui/material/TextField/TextField"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import categoryBarber from "../../assets/category-barbeiro.png"
import categoryHairdresser from "../../assets/category-cabeleireiro.png"
import categoryManicure from "../../assets/category-manicure.png"
import categoryHairSalon from "../../assets/category-salao.png"
import sessionHealthAndBeauty from "../../assets/session-saude-beleza.png"
import starsIcon from "../../assets/star-512.png"
import phoneWhatsappIcon from "../../assets/whatsapp-512.png"
import { localizationFormSchema, LocalizationFormValues } from "../../schemas/LocalizationFormSchema"
import { Client, Container, FormLocalization, GridClient, GridItem, GridItemName, GridItemPhone, GridItemStreet, ItemList, List, PhoneWhatsapp, SectionFilter, SectionLocalization, SectionResults, Stars } from "./styles"

export const Services = () => {
  const { section } = useParams();
  console.log(section ?? "Nenhuma seção selecionada")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalizationFormValues>({ resolver: zodResolver(localizationFormSchema) })
  console.log(errors)
  const onSubmit: SubmitHandler<LocalizationFormValues> = (data) => console.log(data)

  return (
    <Container>
      <SectionLocalization>
        <span>Para onde gostaria de agendar?</span>
        <FormLocalization onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="CEP"
            variant="standard"
            size="small"
            defaultValue={""}
            helperText={errors.postcode ? errors.postcode.message : ""}
            error={!!errors.postcode}
            {...register("postcode")}
          />
          <TextField
            label="Cidade"
            variant="standard"
            size="small"
            defaultValue={""}
            helperText={errors.city ? errors.city.message : ""}
            error={!!errors.city}
            {...register("city")}
          />
          <TextField
            label="Bairro"
            variant="standard"
            size="small"
            defaultValue={errors.neighborhood ? errors.neighborhood.message : ""}
            helperText={errors.neighborhood ? errors.neighborhood.message : ""}
            error={!!errors.neighborhood}
            {...register("neighborhood")}
          />
          <Button variant="outlined" type="submit" size="small">Pesquisar</Button>
        </FormLocalization>
      </SectionLocalization>
      <SectionFilter>
        <h2>Sessão</h2>
        <List>
          <ItemList>
            <Link to="/services/health-beauty">
              <img src={sessionHealthAndBeauty} alt="Serviços de Saúde e Beleza" />
              <span>Saúde e Beleza</span>
            </Link>
          </ItemList>
        </List>
      </SectionFilter>
      <SectionFilter>
        <h2>Categoria</h2>
        <List>
          <ItemList>
            <Link to="/services/hair-salon">
              <img src={categoryHairSalon} alt="Salão de beleza" />
              <span>Salão de beleza</span>
            </Link>
          </ItemList>
          <ItemList>
            <Link to="/services/health-beauty">
              <img src={categoryBarber} alt="Barbearia" />
              <span>Barbearia</span>
            </Link>
          </ItemList>
          <ItemList>
            <Link to="/services/hairdresser">
              <img src={categoryHairdresser} alt="Cabeleireiro" />
              <span>Cabeleireiro</span>
            </Link>
          </ItemList>
          <ItemList>
            <Link to="/services/">
              <img src={categoryManicure} alt="Manicure e Pedicure" />
              <span>Manicure e Pedicure</span>
            </Link>
          </ItemList>
        </List>
      </SectionFilter>
      <SectionFilter>
        <h2>Resultado</h2>
        <SectionResults>
          <Client>
            <div className="avatar">
              <img src="https://randomuser.me/api/portraits/men/74.jpg" alt="John Doe - Cabeleireiro" />
            </div>
            <GridClient>
              <GridItemName>
                <strong>Nome:</strong>
                <span>John Doe</span>
              </GridItemName>
              <GridItemStreet>
                <strong>Endereço:</strong>
                <span>Rua Manoel Matias, 23</span>
              </GridItemStreet>
              <GridItemPhone>
                <strong>Telefone:</strong>
                <span>(11) 3233-7799</span>
              </GridItemPhone>
              <GridItem>
                <strong>Bairro:</strong>
                <span>Vila Nova</span>
              </GridItem>
              <GridItem>
                <strong>Distrito:</strong>
                <span>-</span>
              </GridItem>
              <GridItemPhone>
                <strong>Celular:</strong>
                <PhoneWhatsapp>
                  <span>(11) 99876-7799</span>
                  <img src={phoneWhatsappIcon} alt="Celular com WhatsApp" width={20} />
                </PhoneWhatsapp>
              </GridItemPhone>
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
          </Client>
        </SectionResults>
      </SectionFilter>
    </Container>
  )
}