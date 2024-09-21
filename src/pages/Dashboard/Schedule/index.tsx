import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ptBR } from '@mui/x-date-pickers/locales';
import moment, { Moment } from 'moment-timezone';
import 'moment/dist/locale/pt-br';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../../components/User';
import { Container, ScheduleCalendar, ScheduleForm, ScheduleFormSection, SectionSchedule } from './styles';

moment.tz.setDefault('America/Sao_Paulo');

export const ScheduleService = () => {
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
      <h4>9:00 - 10:00</h4>
      {displayServices && <User name='Felipe Rocha' date='21/09/2024' time='9:00hs' service='Corte Masculino' price='R$ 60,00' />}
      <h4>10:00 - 11:00</h4>
      <h4>11:00 - 12:00</h4>
      <h4>13:00 - 14:00</h4>
      <h4>14:00 - 15:00</h4>
      <h4>15:00 - 16:00</h4>
      <h4>16:00 - 17:00</h4>
      <h4>17:00 - 18:00</h4>
      <h4>18:00 - 19:00</h4>
      <h4>19:00 - 20:00</h4>
    </Container>
  )
}