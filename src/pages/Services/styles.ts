import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  padding: 0.5rem 2rem;
  margin: 0 auto;
`;

export const SectionLocalization = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const FormLocalization = styled.form`
  display: flex;
  gap: 1rem;
`;

export const SectionFilter = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme["background"]};
`;

export const ItemList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    justify-content: center;
  }
`;

export const SectionResults = styled.section`
  display: flex;
`;
