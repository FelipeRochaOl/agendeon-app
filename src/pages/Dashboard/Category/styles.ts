import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  button {
    max-width: 7rem;
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    gap: 1rem;
    border: 1px solid ${(props) => props.theme["blue"]};
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;
