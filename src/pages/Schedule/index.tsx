import { DateCalendar, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ptBR } from '@mui/x-date-pickers/locales';
import moment, { Moment } from 'moment';
import 'moment/dist/locale/pt-br';
import { useState } from 'react';
import { BackButton } from '../../components/Back';
import { Button } from '../../components/Button';
import { CheckboxService } from '../../components/Checkbox';
import { Client } from '../../components/Client';
import { Comment, CommentText, Container, ScheduleCalendar, ScheduleForm, ScheduleFormSection, ScheduleServices, SectionComments, SectionSchedule } from './styles';

export const Schedule = () => {
  const [date, setDate] = useState<Moment>(moment());

  const handleDateChange = (selectedDate: Moment | null) => {
    console.log(selectedDate?.toISOString());
    if (selectedDate?.isValid()) {
      setDate(selectedDate);
    }
  }

  return (
    <Container>
      <BackButton />
      <Client />
      <SectionSchedule>
        <ScheduleForm>
          <ScheduleFormSection>
            <h4>Selecione os serviços desejados:</h4>
            <ScheduleServices>
              <CheckboxService id="service1" name="service1" value="Corte Masculino - R$ 60,00" />
              <CheckboxService id="service2" name="service2" value="Corte Feminino - R$ 100,00" />
              <CheckboxService id="service3" name="service3" value="Tingimento - R$ 150,00" />
            </ScheduleServices>
          </ScheduleFormSection>
          <ScheduleFormSection>
            <h4>Informe a data e a hora do agendamento:</h4>
            <ScheduleCalendar>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                adapterLocale='pt-br'
              >
                <DateTimePicker label="Data e Hora" value={date} onChange={(newValue) => handleDateChange(newValue)} className='selectDate' />
                <DateCalendar value={date} showDaysOutsideCurrentMonth fixedWeekNumber={6} readOnly />
              </LocalizationProvider>
            </ScheduleCalendar>
          </ScheduleFormSection>
          <center>
            <Button type="submit">Agendar</Button>
          </center>
        </ScheduleForm>
        <SectionComments>
          <h3>Comentários</h3>
          <Comment>
            <img src="https://randomuser.me/api/portraits/thumb/men/81.jpg" alt="John Doe Client" />
            <CommentText>
              <span>John Doe</span>
              <p>Amo sempre que vou ai meu amigo !!!</p>
            </CommentText>
          </Comment>
        </SectionComments>
      </SectionSchedule>
    </Container>
  )
}