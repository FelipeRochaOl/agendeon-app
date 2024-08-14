import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button/Button"
import TextField from "@mui/material/TextField/TextField"
import { SubmitHandler, useForm } from "react-hook-form"
import { MdInsertDriveFile } from "react-icons/md"
import { CategoryTable } from "../../../components/Dashboard/CategoryTable"
import { categoryFormSchema, CategoryFormValues } from "../../../schemas/CategoryFormSchema"
import { Container } from "./styles"

export const Category = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({ resolver: zodResolver(categoryFormSchema) })
  const onSubmit: SubmitHandler<CategoryFormValues> = (data) => console.log(data)

  return (
    <Container>
      <h1>Categoria</h1>
      <Button variant="outlined" size="small" startIcon={<MdInsertDriveFile />}>Cadastrar</Button>
      <CategoryTable />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cadastro ou edição da categoria</h2>
        <TextField
          fullWidth={true}
          label="Seção"
          variant="standard"
          size="small"
          defaultValue={""}
          helperText={errors.session ? errors.session.message : ""}
          error={!!errors.session}
          {...register("session")}
        />
        <TextField
          fullWidth={true}
          label="Nome"
          variant="standard"
          size="small"
          defaultValue={""}
          helperText={errors.name ? errors.name.message : ""}
          error={!!errors.name}
          {...register("name")}
        />
        <Button variant="outlined" type="submit" size="small">Salvar</Button>
      </form>
    </Container>
  )
}