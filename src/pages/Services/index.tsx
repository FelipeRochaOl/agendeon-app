import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button/Button"
import TextField from "@mui/material/TextField/TextField"
import { ChangeEvent, useContext, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import categoryBarber from "../../assets/category-barbeiro.png"
import categoryHairdresser from "../../assets/category-cabeleireiro.png"
import categoryManicure from "../../assets/category-manicure.png"
import categoryHairSalon from "../../assets/category-salao.png"
import sessionHealthAndBeauty from "../../assets/session-saude-beleza.png"
import { Client } from "../../components/Client"
import { Toast } from "../../components/Toast"
import { AddressContext } from "../../context/AddressContext"
import { CategoryContext } from "../../context/CategoryContext"
import { CompanyContext } from "../../context/CompanyContext"
import { FilterContext } from "../../context/FilterContext"
import { SessionContext } from "../../context/SessionContext"
import { localizationFormSchema, LocalizationFormValues } from "../../schemas/LocalizationFormSchema"
import { Container, FormLocalization, ItemList, List, SectionFilter, SectionLocalization, SectionResults } from "./styles"

export const Services = () => {
  const { section, category } = useParams();
  const { companies, getCompanies } = useContext(CompanyContext)
  const { sessions } = useContext(SessionContext)
  const { categories } = useContext(CategoryContext)
  const {
    filterCompanyByAddress,
    filterCompanyByCategory,
    filterCompanyBySection
  } = useContext(FilterContext)
  const { getAddressWithCEP, address } = useContext(AddressContext)

  console.log(section ?? "Nenhuma seção selecionada")
  console.log(category ?? "Nenhuma categoria selecionada")

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LocalizationFormValues>({ resolver: zodResolver(localizationFormSchema) })

  const onSubmit: SubmitHandler<LocalizationFormValues> = (data) => {
    if (!data.postcode) {
      getCompanies()
      reset()
      return
    }
    filterCompanyByAddress({
      zip: data.postcode,
      city: data.city!,
      neighborhood: data.neighborhood!
    })
  }

  const handleGetByZip = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const zip = event.target.value
    getAddressWithCEP(zip)
  }

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

  useEffect(() => {
    if (address) {
      setValue("city", address.city)
      setValue("neighborhood", address.neighborhood)
    }
  }, [address, setValue])

  useEffect(() => {
    if (section && !category) {
      const session = sessions.find(session => session.urlPath === section)
      if (!session) {
        Toast({ type: "error", text: "Seção não encontrada" })
        return
      }
      filterCompanyBySection(session.code!)
    }
    if (category && section) {
      const session = sessions.find(session => session.urlPath === section)
      if (!session) {
        Toast({ type: "error", text: "Seção não encontrada" })
        return
      }
      const findCategory = categories.find(categoryFind => categoryFind.urlPath === category)
      if (!findCategory) {
        Toast({ type: "error", text: "Categoria não encontrada" })
        return
      }
      if (session && category) {
        filterCompanyByCategory(session.code!, findCategory.code!)
      }
    }
  }, [section, category])

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
            onBlur={handleGetByZip}
          />
          <TextField
            label="Cidade"
            variant="standard"
            size="small"
            disabled
            InputLabelProps={{ shrink: true }}
            helperText={errors.city ? errors.city.message : ""}
            error={!!errors.city}
            {...register("city")}
          />
          <TextField
            label="Bairro"
            variant="standard"
            size="small"
            disabled
            InputLabelProps={{ shrink: true }}
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
            <ItemList key={session.code}>
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
            <ItemList key={category.code}>
              <Link to={`/services/${category.session.urlPath}/${category.urlPath}`}>
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
          {companies && companies.map(company => <Client key={company.id} {...company} />)}
        </SectionResults>
      </SectionFilter>
    </Container>
  )
}