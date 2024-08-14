import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button/Button"
import TextField from "@mui/material/TextField/TextField"
import { useContext, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { MdInsertDriveFile } from "react-icons/md"
import { SessionTable } from "../../../components/Dashboard/SessionTable"
import { SessionContext } from "../../../context/SessionContext"
import { sessionFormSchema, SessionFormValues } from "../../../schemas/SessionFormSchema"
import { Buttons, Container } from "./styles"

export const Session = () => {
  const { sessions, getSessions, deleteSession, updateSession, createSession } = useContext(SessionContext)
  const [code, setCode] = useState("")
  const [openForm, setOpenForm] = useState(false)

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SessionFormValues>({ resolver: zodResolver(sessionFormSchema) })

  const openFormHandler = () => setOpenForm(true)
  const closeFormHandler = () => resetForm()

  const resetForm = () => {
    reset()
    setCode("")
    setOpenForm(false)
  }

  const onSubmit: SubmitHandler<SessionFormValues> = async (data) => {
    if (code) {
      await updateSession({
        code,
        name: data.name
      })
      resetForm()
      return
    }
    createSession(data)
    resetForm()
  }

  const editSession = (code: string) => {
    const session = sessions.find((session) => session.code === code)
    if (session) {
      setCode(code)
      setOpenForm(true)
      setValue("name", session.name)
      setFocus("name")
    }
  }

  useEffect(() => {
    if (sessions.length === 0) getSessions()
  }, [sessions, getSessions])

  return (
    <Container>
      <h1>Seção</h1>
      <Button variant="outlined" size="small" startIcon={<MdInsertDriveFile />} onClick={openFormHandler}>Cadastrar</Button>
      {openForm && <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cadastrar uma seção</h2>
        <TextField
          fullWidth={true}
          label="Nome da seção"
          variant="standard"
          size="small"
          helperText={errors.name ? errors.name.message : ""}
          error={!!errors.name}
          {...register("name")}
        />
        <Buttons>
          <Button variant="outlined" type="submit" size="small">Salvar</Button>
          <Button variant="outlined" size="small" color="error" onClick={closeFormHandler}>Fechar</Button>
        </Buttons>
      </form>}
      <SessionTable sessions={sessions} editSession={editSession} deleteSession={deleteSession} />
    </Container>
  )
}