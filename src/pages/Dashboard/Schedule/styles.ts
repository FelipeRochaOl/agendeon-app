import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 2rem;
  margin: 0 auto;
  gap: 1rem;
`;

export const SectionSchedule = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;

export const ScheduleForm = styled.form`
  flex: 1;
`;

export const ScheduleFormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 1rem;
`;

export const ScheduleServices = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ScheduleCalendar = styled.div`
  display: flex;
  gap: 1rem;
  border: 1px solid ${(props) => props.theme["blueDark"]};
  border-radius: 0.5rem;

  .selectDate {
    margin: 1rem;
  }
`;

export const SectionComments = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  min-width: 300px;
`;

export const Comment = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;

  img {
    border-radius: 50%;
  }
`;

export const CommentText = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 0.5rem;
  }
`;
