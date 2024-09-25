import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormHelperText } from '@mui/material';
import { DateTimePicker, LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ptBR } from '@mui/x-date-pickers/locales';
import moment, { Moment } from 'moment-timezone';
import 'moment/dist/locale/pt-br';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import cachorroImg from '../../assets/cachorro.png';
import { BackButton } from '../../components/Back';
import { Button } from '../../components/Button';
import { CheckboxService } from '../../components/Checkbox';
import { Client } from '../../components/Client';
import { AuthContext } from '../../context/AuthContext';
import { CommentContext } from '../../context/CommentContext';
import { CompanyContext } from '../../context/CompanyContext';
import { ScheduleContext, ScheduleHistory } from '../../context/ScheduleContext';
import { ServiceContext } from '../../context/ServiceContext';
import { scheduleFormSchema, ScheduleFormValues } from '../../schemas/ScheduleFormSchema';
import { Comment, CommentText, Container, ScheduleCalendar, ScheduleForm, ScheduleFormSection, ScheduleServices, SectionComments, SectionSchedule } from './styles';

moment.tz.setDefault('America/Sao_Paulo');

export const Schedule = () => {
  const { client } = useParams();
  const { getCompanyById, company } = useContext(CompanyContext)
  const { services, getServices } = useContext(ServiceContext)
  const { isAuthenticated } = useContext(AuthContext)
  const { comments } = useContext(CommentContext)
  const { getHistory, history, checkout, setCheckout } = useContext(ScheduleContext)
  const [date, setDate] = useState<Moment>(moment().minutes(0));
  const [serviceId, setServiceId] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const [disabledTimesToday, setDisabledTimesToday] = useState<ScheduleHistory[]>([])

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<ScheduleFormValues>({ resolver: zodResolver(scheduleFormSchema) })
  console.log(errors)

  const onSubmit: SubmitHandler<ScheduleFormValues> = async (data) => {
    if (!serviceId) {
      setError("serviceId", { message: "Serviço é obrigatório" })
      return
    } else {
      clearErrors("serviceId")
    }
    reset()
    const [ptDate, hour] = data.scheduleDate.split(' ')
    const [hours, minutes] = hour.split(':')
    const [day, month, year] = ptDate.split('/')
    const findService = services?.find(service => service.code === serviceId)
    const newDate = moment(`${year}-${month}-${day}`).toDate()
    const date = newDate.setHours(parseInt(hours), parseInt(minutes))
    const scheduleDate = moment(date).toDate()
    const scheduleData = {
      companyId: client as string,
      serviceId: serviceId as string,
      serviceName: findService?.description ?? '',
      total: findService?.value ?? 0,
      priceFormatted: findService?.formattedValue ?? 'R$ 0,00',
      scheduleDate,
      formattedDate: data.scheduleDate,
      hour: parseInt(hours),
      minute: parseInt(minutes),
      formattedTime: `${hours}:${minutes}`,
      status: 'approved'
    }
    setCheckout([...checkout, scheduleData])
    navigate('/checkout');
  }

  const handleDateChange = (selectedDate: Moment | null) => {
    if (selectedDate?.isValid()) {
      selectedDate.seconds(0);
      console.log("selected:", selectedDate.toDate());
      setDate(selectedDate);
    }
  }

  const handleCheckTime = (time: Moment) => {
    time.seconds(0)
    if (time.isBefore(moment())) return true
    if (time.hour() < 8 || time.hour() > 20) return true
    return disabledTimesToday.some(disabledTime => {
      const datetime = moment(disabledTime.scheduleDate).hour(disabledTime.hour).minute(disabledTime.minutes)
      return time.isSame(datetime)
    })
  }

  const handleServiceChange = (value: string) => {
    setServiceId(value);
    setValue("serviceId", serviceId)
  }

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (isAuthenticated && client && !services?.length) {
      getCompanyById(client)
      getServices(client)
    }
  }, [getCompanyById, getServices, client, isAuthenticated, services.length])

  useEffect(() => {
    if (history && history.length) {
      setDisabledTimesToday(history)
    }
  }, [getHistory, client, isAuthenticated, history])

  useEffect(() => {
    if (isAuthenticated && client) {
      getHistory(client)
    }
  }, [])

  return (
    <Container>
      <BackButton />
      {Object.keys(company).length && <Client key={company.id} {...company} />}
      <SectionSchedule>
        <ScheduleForm onSubmit={handleSubmit(onSubmit)}>
          <ScheduleFormSection>
            <h4>Selecione os serviços desejados:</h4>
            <FormControl error={!!errors.serviceId} variant="standard">
              <ScheduleServices>
                {services?.map(service => (
                  <CheckboxService
                    key={service.code}
                    id={service.code}
                    value={service.code}
                    text={`${service.description} - ${service.formattedValue}`}
                    setValue={(value) => handleServiceChange(value)}
                  />
                ))}
              </ScheduleServices>
              {errors.serviceId && <FormHelperText color='error'>{errors.serviceId.message}</FormHelperText>}
            </FormControl>
          </ScheduleFormSection>
          <ScheduleFormSection>
            <h4>Informe a data e a hora do agendamento:</h4>
            <ScheduleCalendar>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                adapterLocale='pt-br'
              >
                <DateTimePicker
                  label="Data e Hora"
                  value={date}
                  minutesStep={15}
                  disablePast
                  shouldDisableTime={handleCheckTime}
                  className='selectDate'
                  timezone='America/Sao_Paulo'
                  {...register("scheduleDate")}
                  onChange={(newValue) => handleDateChange(newValue)}
                />
                <center>
                  <span>Apenas visualização:</span>
                  <StaticDateTimePicker
                    value={date}
                    disablePast
                    disableFuture
                    showDaysOutsideCurrentMonth
                    fixedWeekNumber={6}
                    readOnly
                  />
                </center>
                {errors.scheduleDate && <FormHelperText id="scheduleDate">{errors.scheduleDate.message}</FormHelperText>}
              </LocalizationProvider>
            </ScheduleCalendar>
          </ScheduleFormSection>
          <center>
            <Button type="submit">Agendar</Button>
          </center>
        </ScheduleForm>
        <SectionComments>
          <h3>Comentários</h3>
          {comments.map(comment =>
            <Comment key={comment.id}>
              <img src={cachorroImg} alt={comment.name} width={60} />
              <CommentText>
                <span>{comment.name}</span>
                <p>{comment.comment}</p>
              </CommentText>
            </Comment>
          )}
        </SectionComments>
      </SectionSchedule>
    </Container>
  )
}