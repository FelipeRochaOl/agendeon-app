import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from "@mui/material"
import Button from "@mui/material/Button/Button"
import TextField from "@mui/material/TextField/TextField"
import { useContext, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { MdInsertDriveFile } from "react-icons/md"
import { ServiceTable } from "../../../components/Dashboard/ServiceTable"
import { AuthContext } from "../../../context/AuthContext"
import { CompanyContext } from "../../../context/CompanyContext"
import { ServiceContext } from "../../../context/ServiceContext"
import { serviceFormSchema, ServiceFormValues } from "../../../schemas/ServiceFormSchema"
import { Buttons, Container } from "./styles"

export const ServiceDash = () => {
  const {
    services, getServices, deleteService, updateService, createService, openForm, setOpenForm
  } = useContext(ServiceContext)
  const { company, getCompanyByUserId } = useContext(CompanyContext)
  const { token } = useContext(AuthContext)
  const [code, setCode] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ServiceFormValues>({ resolver: zodResolver(serviceFormSchema) })
  console.log(errors)

  const resetForm = () => {
    reset()
    setCode("")
    setOpenForm(false)
  }

  const onSubmit: SubmitHandler<ServiceFormValues> = async (data) => {
    if (code) {
      await updateService({
        code,
        description: data.description,
        value: data.value,
        duration: data.duration,
        companyId: company.id
      })
      resetForm()
      return
    }
    createService({
      description: data.description,
      value: data.value,
      duration: data.duration,
      companyId: company.id
    })
    resetForm()
  }

  const editService = (code: string) => {
    const service = services.find((service) => service.code === code)
    if (service) {
      setCode(code)
      setOpenForm(true)
      setValue("description", service.description)
      setValue("value", service.value)
      setValue("duration", service.duration)
      setFocus("description")
    }
  }

  useEffect(() => {
    if (company && !Object.keys(company).length && token) getCompanyByUserId()
    if (company && Object.keys(company).length && !services.length) {
      getServices(company.id)
    }
  }, [company, getCompanyByUserId, services, getServices, token])

  return (
    <Container>
      <h1>Serviços</h1>
      <Button variant="outlined" size="small" startIcon={<MdInsertDriveFile />} onClick={() => setOpenForm(true)}>
        Cadastrar
      </Button>
      {openForm && <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cadastro ou edição de serviços</h2>
        <TextField
          fullWidth={true}
          label="Descrição"
          variant="standard"
          size="small"
          helperText={errors.description ? errors.description.message : ""}
          error={!!errors.description}
          {...register("description")}
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="value">Valor</InputLabel>
          <Input
            id="value"
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            defaultValue={0}
            error={!!errors.value}
            {...register("value")}
          />
          {errors.value && <FormHelperText id="value">{errors.value.message}</FormHelperText>}
        </FormControl>
        <TextField
          fullWidth={true}
          type="number"
          label="Duração"
          variant="standard"
          size="small"
          defaultValue={1800}
          helperText={errors.duration ? errors.duration.message : ""}
          error={!!errors.duration}
          {...register("duration")}
        />
        <Buttons>
          <Button variant="outlined" type="submit" size="small">Salvar</Button>
          <Button variant="outlined" size="small" type="reset" color="error" onClick={resetForm}>Fechar</Button>
        </Buttons>
      </form>}
      <ServiceTable services={services} deleteService={deleteService} editService={editService} />
    </Container>
  )
}