import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Switch, TextField } from "@mui/material";
import { useMask } from '@react-input/mask';
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/Toast";
import { AddressContext } from "../../context/AddressContext";
import { AuthContext } from "../../context/AuthContext";
import { ClientContext } from "../../context/ClientContext";
import { CompanyContext } from "../../context/CompanyContext";
import { signUpFormSchema, SignUpFormValues } from "../../schemas/SignUpFormSchema";
import { Buttons, Container, ModalForm } from "./styles";

interface ISignUpProps {
  display: boolean;
}

export const SignUp = (props: ISignUpProps) => {
  const { createClient } = useContext(ClientContext)
  const { createCompany } = useContext(CompanyContext)
  const { address, getAddressWithCEP, createAddress } = useContext(AddressContext)
  const { isAuthenticated, login, signUp } = useContext(AuthContext)
  const navigate = useNavigate()
  const [display, setDisplay] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
  const cnpjMask = useMask({ mask: '__.___.___/____-__', replacement: { _: /\d/ } });

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpFormSchema) })
  if (errors) console.log(errors)

  const resetForm = () => {
    reset()
    setDisplay(false)
    navigate("/")
  }

  const onSubmitForm: SubmitHandler<SignUpFormValues> = async (data) => {
    await signUp({
      email: data.email,
      password: data.password,
    })
    const auth = await login({
      email: data.email,
      password: data.password,
    })
    if (!auth.token) {
      Toast({ type: "error", text: "Erro ao cadastrar usuário" })
      return
    }
    if (!data.isBusiness) {
      await createClient({
        name: data.name as string,
        cpf: data.cpf as string,
        age: data.age as number,
      })
    } else {
      const addressId = await createAddress({
        zip: data.address?.zip as string,
        street: data.address?.street as string,
        number: data.address?.number as string,
        complement: data.address?.complement as string,
        neighborhood: data.address?.neighborhood as string,
        city: data.address?.city as string,
        state: data.address?.state as string,
        uf: data.address?.uf as string,
        country: data.address?.country as string
      })
      await createCompany({
        companyName: data.name as string,
        tradeName: data.tradeName as string,
        cnpj: data.cnpj as string,
        addressId: addressId as string
      })
    }
    resetForm()
    Toast({
      type: "success", text: "Usuário cadastrado com sucesso", options: {
        onClose: () => navigate("/dashboard")
      }
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
      return
    }
    setDisplay(props.display)
    if (props.display) setFocus("name")
  }, [props, setFocus, isAuthenticated, navigate])

  useEffect(() => {
    if (!address) return
    setValue("address.zip", address.zip, { shouldValidate: true, shouldDirty: true })
    setValue("address.street", address.street, { shouldValidate: true, shouldDirty: true })
    setValue("address.number", address.number, { shouldValidate: true, shouldDirty: true })
    setValue("address.complement", address.complement, { shouldValidate: true, shouldDirty: true })
    setValue("address.neighborhood", address.neighborhood, { shouldValidate: true, shouldDirty: true })
    setValue("address.city", address.city, { shouldValidate: true, shouldDirty: true })
    setValue("address.uf", address.uf, { shouldValidate: true, shouldDirty: true })
    setValue("address.state", address.state, { shouldValidate: true, shouldDirty: true })
    setValue("address.country", address.country, { shouldValidate: true, shouldDirty: true })
  }, [address, setValue])

  const handleBusiness = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("address.zip", "")
    setValue("address.street", "")
    setValue("address.number", "")
    setValue("address.complement", "")
    setValue("address.neighborhood", "")
    setValue("address.city", "")
    setValue("address.uf", "")
    setValue("address.country", "")
    setIsBusiness(event.target.checked)
  }

  return (
    <Container $display={display}>
      <ModalForm onSubmit={handleSubmit(onSubmitForm)}>
        <h1>Entrar</h1>
        <TextField
          fullWidth={true}
          label="Nome"
          variant="standard"
          size="small"
          type="text"
          helperText={errors.name ? errors.name.message : ""}
          error={!!errors.name}
          {...register("name")}
        />
        {isBusiness && <small>**Razão Social</small>}
        <FormGroup className="left">
          <FormControlLabel control={<Switch onChange={handleBusiness} />} label="É empresa?" />
        </FormGroup>
        {!isBusiness && <TextField
          fullWidth={true}
          label="Age"
          variant="standard"
          size="small"
          type="number"
          helperText={errors.age ? errors.age.message : ""}
          error={!!errors.age}
          {...register("age")}
        />}
        {!isBusiness && <TextField
          inputRef={cpfMask}
          fullWidth={true}
          label="CPF"
          variant="standard"
          size="small"
          type="text"
          helperText={errors.cpf ? errors.cpf.message : ""}
          error={!!errors.cpf}
          {...register("cpf")}
        />}
        {isBusiness && (
          <>
            <TextField
              fullWidth={true}
              label="Nome Fantasia"
              variant="standard"
              size="small"
              type="text"
              helperText={errors.address?.zip ? errors.address.zip.message : ""}
              error={!!errors.address?.street}
              {...register("tradeName")}
              onBlur={(event) => getAddressWithCEP(event.target.value)}
            />
            <TextField
              inputRef={cnpjMask}
              fullWidth={true}
              label="CNPJ"
              variant="standard"
              size="small"
              type="text"
              helperText={errors.cnpj ? errors.cnpj.message : ""}
              error={!!errors.cnpj}
              {...register("cnpj")}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Endereço</FormLabel>
              <TextField
                fullWidth={true}
                label="Cep"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.zip ? errors.address.zip.message : ""}
                error={!!errors.address?.street}
                {...register("address.zip")}
                onBlur={(event) => getAddressWithCEP(event.target.value)}
              />
              <TextField
                fullWidth={true}
                label="Rua"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.street ? errors.address.street.message : ""}
                error={!!errors.address?.street}
                {...register("address.street")}
              />
              <TextField
                fullWidth={true}
                label="Número"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.number ? errors.address.number.message : ""}
                error={!!errors.address?.number}
                {...register("address.number")}
              />
              <TextField
                fullWidth={true}
                label="Complemento"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.complement ? errors.address.complement.message : ""}
                error={!!errors.address?.complement}
                {...register("address.complement")}
              />
              <TextField
                fullWidth={true}
                label="Bairro"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.neighborhood ? errors.address.neighborhood.message : ""}
                error={!!errors.address?.neighborhood}
                {...register("address.neighborhood")}
              />
              <TextField
                fullWidth={true}
                label="Cidade"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.city ? errors.address.city.message : ""}
                error={!!errors.address?.city}
                {...register("address.city")}
              />
              <TextField
                fullWidth={true}
                label="Estado"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.state ? errors.address.state.message : ""}
                error={!!errors.address?.state}
                {...register("address.state")}
              />
              <TextField
                fullWidth={true}
                label="UF"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.uf ? errors.address.uf.message : ""}
                error={!!errors.address?.uf}
                {...register("address.uf")}
              />
              <TextField
                fullWidth={true}
                label="País"
                variant="standard"
                size="small"
                type="text"
                InputLabelProps={{ shrink: true }}
                helperText={errors.address?.country ? errors.address.country.message : ""}
                error={!!errors.address?.country}
                {...register("address.country")}
              />
            </FormControl>
          </>
        )}
        <FormControl component="fieldset">
          <FormLabel component="legend">Dados para login:</FormLabel>
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
          <TextField
            fullWidth={true}
            label="Confirmar Senha"
            variant="standard"
            size="small"
            type="password"
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
            error={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
        </FormControl>
        <Buttons>
          <Button variant="outlined" type="submit" size="large">Cadastrar</Button>
          <Button variant="outlined" size="large" onClick={resetForm}>Fechar</Button>
        </Buttons>
      </ModalForm>
    </Container>
  )
}