import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import Button from "@mui/material/Button/Button"
import TextField from "@mui/material/TextField/TextField"
import { useContext, useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { MdInsertDriveFile } from "react-icons/md"
import { CategoryTable } from "../../../components/Dashboard/CategoryTable"
import { CategoryContext } from "../../../context/CategoryContext"
import { SessionContext } from "../../../context/SessionContext"
import { categoryFormSchema, CategoryFormValues } from "../../../schemas/CategoryFormSchema"
import { Buttons, Container } from "./styles"

export const Category = () => {
  const {
    categories, getCategories, deleteCategory, updateCategory, createCategory, openForm, setOpenForm
  } = useContext(CategoryContext)
  const { sessions, getSessions } = useContext(SessionContext)
  const [code, setCode] = useState("")

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<CategoryFormValues>({ resolver: zodResolver(categoryFormSchema) })

  const resetForm = () => {
    reset()
    setCode("")
    setOpenForm(false)
  }

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    if (code) {
      await updateCategory({
        code,
        sessionCode: data.session,
        name: data.name
      })
      resetForm()
      return
    }
    createCategory({
      sessionCode: data.session,
      name: data.name
    })
    resetForm()
  }

  const editCategory = (code: string) => {
    const category = categories.find((category) => category.code === code)
    if (category) {
      setCode(code)
      setOpenForm(true)
      setValue("name", category.name)
      setValue("session", category.session.code ?? '')
      setFocus("name")
    }
  }

  useEffect(() => {
    if (categories.length === 0) {
      getSessions()
      getCategories()
    }
  }, [categories, getCategories, getSessions])

  return (
    <Container>
      <h1>Categoria</h1>
      <Button variant="outlined" size="small" startIcon={<MdInsertDriveFile />} onClick={() => setOpenForm(true)}>
        Cadastrar
      </Button>
      {openForm && <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cadastro ou edição da categoria</h2>

        <FormControl fullWidth error={!!errors.session}>
          <InputLabel id="session-label">Seção</InputLabel>
          <Controller
            control={control}
            rules={{ required: true }}
            name="session"
            defaultValue=""
            render={({ field: { onChange, value, ref, name } }) => (
              <>
                <Select
                  ref={ref}
                  name={name}
                  labelId="session-label"
                  fullWidth={true}
                  value={value}
                  label="Seção"
                  variant="standard"
                  size="small"
                  defaultValue=""
                  error={!!errors.session}
                  onChange={onChange}
                >
                  <MenuItem value="" disabled>
                    <em>Selecione uma seção</em>
                  </MenuItem>
                  {sessions.map((session) => (
                    <MenuItem key={session.code} value={session.code}>
                      <em>{session.name}</em>
                    </MenuItem>
                  ))}
                </Select>
                {errors.session && <FormHelperText>{errors.session.message}</FormHelperText>}
              </>
            )}
          />
        </FormControl>
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
        <Buttons>
          <Button variant="outlined" type="submit" size="small">Salvar</Button>
          <Button variant="outlined" size="small" color="error" onClick={resetForm}>Fechar</Button>
        </Buttons>
      </form>}
      <CategoryTable categories={categories} deleteCategory={deleteCategory} editCategory={editCategory} />
    </Container>
  )
}