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

import { useContext } from "react"
import { Client } from "../../components/Client"
import { CategoryContext } from "../../context/CategoryContext"
import { CompanyContext } from "../../context/CompanyContext"
import { SessionContext } from "../../context/SessionContext"
import { localizationFormSchema, LocalizationFormValues } from "../../schemas/LocalizationFormSchema"
import { Container, FormLocalization, ItemList, List, SectionFilter, SectionLocalization, SectionResults } from "./styles"

export const Services = () => {
  const { section, category } = useParams();
  const { companies } = useContext(CompanyContext)
  const { sessions } = useContext(SessionContext)
  const { categories } = useContext(CategoryContext)

  console.log(section ?? "Nenhuma seção selecionada")
  console.log(category ?? "Nenhuma categoria selecionada")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalizationFormValues>({ resolver: zodResolver(localizationFormSchema) })
  const onSubmit: SubmitHandler<LocalizationFormValues> = (data) => console.log(data)

  const handleGetImageByTag = (tag: string) => {
    switch (tag) {
      case "barbearia":
        return categoryBarber
      case "cabeleireiro":
        return categoryHairdresser
      case "manicure-e-pedicure":
        return categoryManicure
      case "salao-de-beleza":
        return categoryHairSalon
      default:
        return categoryHairSalon
    }
  }

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
          {sessions?.map(session => (
            <ItemList>
              <Link to={`/services/${session.urlPath}`}>
                <img src={sessionHealthAndBeauty} alt={`Serviços de ${session.name}`} />
                <span>{session.name}</span>
              </Link>
            </ItemList>
          ))}
        </List>
      </SectionFilter>
      <SectionFilter>
        <h2>Categoria</h2>
        <List>
          {categories?.map(category => (
            <ItemList>
              <Link to={`/services/${category.urlPath}`}>
                <img src={handleGetImageByTag(category.urlPath)} alt={category.name} />
                <span>{category.name}</span>
              </Link>
            </ItemList>
          ))}
        </List>
      </SectionFilter>
      <SectionFilter>
        <h2>Resultado</h2>
        <SectionResults>
          {companies.map(company => <Client {...company} />)}
        </SectionResults>
      </SectionFilter>
    </Container>
  )
}