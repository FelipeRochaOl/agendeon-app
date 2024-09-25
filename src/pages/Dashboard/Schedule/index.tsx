import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ptBR } from '@mui/x-date-pickers/locales';
import moment, { Moment } from 'moment-timezone';
import 'moment/dist/locale/pt-br';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../../components/User';
import { AuthContext } from '../../../context/AuthContext';
import { CompanyContext } from '../../../context/CompanyContext';
import { ScheduleContext } from '../../../context/ScheduleContext';
import { Container, ScheduleCalendar, ScheduleForm, ScheduleFormSection, SectionSchedule } from './styles';

moment.tz.setDefault('America/Sao_Paulo');

export const ScheduleService = () => {
  const { isBusiness } = useContext(AuthContext)
  const { company } = useContext(CompanyContext)
  const { schedules, getSchedules } = useContext(ScheduleContext)
  const [displayServices, setDisplayServices] = useState(false);
  const [date, setDate] = useState<Moment>(moment().minutes(0));
  const { handleSubmit } = useForm()

  const onSubmit = () => {
    setDisplayServices(true);
  }

  const handleDateChange = (selectedDate: Moment | null) => {
    if (selectedDate?.isValid()) {
      selectedDate.seconds(0);
      console.log("selected:", selectedDate.toDate());
      setDate(selectedDate);
    }
  }

  useEffect(() => {
    if (!schedules && isBusiness) {
      getSchedules(company.id);
    }
  }, [company, getSchedules, isBusiness, schedules])

  return (
    <Container>
      <SectionSchedule>
        <ScheduleForm onSubmit={handleSubmit(onSubmit)}>
          <ScheduleFormSection>
            <h4>Selecione a data:</h4>
            <ScheduleCalendar>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                adapterLocale='pt-br'
              >
                <DatePicker
                  label="Data e Hora"
                  value={date}
                  disablePast
                  onChange={(newValue) => handleDateChange(newValue)}
                  className='selectDate'
                  timezone='America/Sao_Paulo'
                />
              </LocalizationProvider>
            </ScheduleCalendar>
            <Button type="submit">Pesquisar</Button>
          </ScheduleFormSection>
        </ScheduleForm>
      </SectionSchedule>
      <h4>Agendas</h4>
      {displayServices && schedules?.map(schedule =>
        <User
          name={schedule.client.name}
          date={schedule.formattedDate}
          time={schedule.formattedTime}
          service={schedule.service.description}
          price={schedule.service.formattedValue}
        />
      )}
    </Container>
  )
}