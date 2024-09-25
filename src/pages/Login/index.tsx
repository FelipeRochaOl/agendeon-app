import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginFormSchema, LoginFormValues } from "../../schemas/LoginFormSchema";
import { Buttons, Container, ModalForm } from "./styles";

interface ILoginProps {
  display: boolean;
}

export const Login = (props: ILoginProps) => {
  const navigate = useNavigate()
  const [display, setDisplay] = useState(false);
  const { isAuthenticated, login } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginFormSchema) })

  const resetForm = () => {
    reset()
    setDisplay(false)
    navigate("/")
  }

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    resetForm()
    const auth = await login(data)
    if (auth && auth.token) {
      navigate("/dashboard")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
      return
    }
    setDisplay(props.display)
    if (props.display) setFocus("email")
  }, [props, setFocus, isAuthenticated, navigate])

  return (
    <Container $display={display}>
      <ModalForm onSubmit={handleSubmit(onSubmit)}>
        <h1>Entrar</h1>
        <TextField
          fullWidth={true}
          label="Email"
          variant="standard"
          size="small"
          type="email"
          helperText={errors.email ? errors.email.message : ""}
          error={!!errors.email}
          {...register("email")}
        />
        <TextField
          fullWidth={true}
          label="Senha"
          variant="standard"
          size="small"
          type="password"
          helperText={errors.password ? errors.password.message : ""}
          error={!!errors.password}
          {...register("password")}
        />
        <Buttons>
          <Button variant="outlined" type="submit" size="large">Entrar</Button>
          <Button variant="outlined" size="large" onClick={resetForm}>Fechar</Button>
        </Buttons>
        <Link to="/sign-up">Cadastrar</Link>
      </ModalForm>
    </Container>
  )
}