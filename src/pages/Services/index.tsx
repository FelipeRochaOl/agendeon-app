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

import { Client } from "../../components/Client"
import { localizationFormSchema, LocalizationFormValues } from "../../schemas/LocalizationFormSchema"
import { Container, FormLocalization, ItemList, List, SectionFilter, SectionLocalization, SectionResults } from "./styles"

export const Services = () => {
  const { section, category } = useParams();
  console.log(section ?? "Nenhuma seção selecionada")
  console.log(category ?? "Nenhuma categoria selecionada")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalizationFormValues>({ resolver: zodResolver(localizationFormSchema) })
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
        <h2>Seção</h2>
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
          <Client />
        </SectionResults>
      </SectionFilter>
    </Container>
  )
}