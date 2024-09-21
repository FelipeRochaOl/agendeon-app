import { DateTimePicker, LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ptBR } from '@mui/x-date-pickers/locales';
import moment, { Moment } from 'moment-timezone';
import 'moment/dist/locale/pt-br';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/Back';
import { Button } from '../../components/Button';
import { CheckboxService } from '../../components/Checkbox';
import { Client } from '../../components/Client';
import { CommentContext } from '../../context/CommentContext';
import { Comment, CommentText, Container, ScheduleCalendar, ScheduleForm, ScheduleFormSection, ScheduleServices, SectionComments, SectionSchedule } from './styles';

moment.tz.setDefault('America/Sao_Paulo');

export const Schedule = () => {
  const { comments } = useContext(CommentContext)
  const [date, setDate] = useState<Moment>(moment().minutes(0));
  const navigate = useNavigate();
  const { handleSubmit } = useForm()

  const disabledTimesToday = [
    { date: "2024-09-20", hour: 20, minutes: 15 },
    { date: "2024-09-20", hour: 21, minutes: 15 },
    { date: "2024-09-20", hour: 23, minutes: 15 },
  ]

  const onSubmit = () => {
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
      const datetime = moment(disabledTime.date).hour(disabledTime.hour).minute(disabledTime.minutes)
      return time.isSame(datetime)
    })
  }

  return (
    <Container>
      <BackButton />
      <Client />
      <SectionSchedule>
        <ScheduleForm onSubmit={handleSubmit(onSubmit)}>
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
                <DateTimePicker
                  label="Data e Hora"
                  value={date}
                  minutesStep={15}
                  disablePast
                  onChange={(newValue) => handleDateChange(newValue)}
                  shouldDisableTime={handleCheckTime}
                  className='selectDate'
                  timezone='America/Sao_Paulo'
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
              <img src={`https://randomuser.me/api/portraits/thumb/men/${comment.id}.jpg`} alt={comment.name} />
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