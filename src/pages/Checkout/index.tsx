import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import confirmIcon from "../../assets/confirm.png"
import { BackButton } from "../../components/Back"
import { Button } from "../../components/Button"
import { Client } from "../../components/Client"
import { Service } from "../../components/Service"
import { Toast } from "../../components/Toast"
import { AuthContext } from "../../context/AuthContext"
import { CompanyContext } from "../../context/CompanyContext"
import { ScheduleContext } from "../../context/ScheduleContext"
import { ConfirmMessage, Container, ContainerConfirm, ServiceForm } from "./styles"

export const Checkout = () => {
  const { company } = useContext(CompanyContext)
  const { isAuthenticated } = useContext(AuthContext)
  const { checkout, setCheckout, createSchedule } = useContext(ScheduleContext)
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [total, setTotal] = useState('R$ 0,00');

  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    try {
      if (checkout) {
        const promises = checkout.map(service => createSchedule(service))
        await Promise.all(promises)
        setCheckout([])
        setConfirm(true)
      }
    } catch (error) {
      Toast({ text: 'Erro ao criar agenda', type: 'error' })
    }
  }

  const handleNavigate = () => {
    setConfirm(false)
    navigate('/services');
  }

  const handleDeleteService = (id: string) => {
    if (checkout) {
      const result = checkout.filter(service => service.serviceId !== id)
      setCheckout(result)
    }
  }

  const sumTotal = () => {
    const total = checkout.reduce((acc, service) => acc + service.total, 0)
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (checkout) {
      const total = sumTotal()
      setTotal(total)
    }
  }, [checkout])

  useEffect(() => {
    if (!Object.keys(company).length) {
      navigate('/services')
    }
  }, [company])

  return (
    <Container>
      <BackButton />
      {company && Object.keys(company).length && <Client {...company} />}
      <ServiceForm onSubmit={handleSubmit(onSubmit)}>
        {checkout && checkout.map(service => (
          <Service
            id={service.serviceId}
            date={service.formattedDate}
            price={service.priceFormatted}
            service={service.serviceName}
            deleteService={handleDeleteService}
          />
        ))}
        <center>
          {checkout && checkout.length > 0
            ? <Button type="submit" color="green">Confirmar {total}</Button>
            : <Button type="reset" color="yellow" onClick={() => navigate(`/schedule/client/${company.id}`)}>Adicionar serviços</Button>
          }
        </center>
      </ServiceForm>
      <ContainerConfirm $display={confirm} onClick={handleNavigate}>
        <ConfirmMessage>
          <img src={confirmIcon} alt="Agendamento confirmado" width={50} />
          <span>Agendamento confirmado com sucesso!</span>
        </ConfirmMessage>
      </ContainerConfirm>
    </Container>
  )
}