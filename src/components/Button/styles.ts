import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2.5rem;
  background-color: ${(props) => props.theme["yellow"]};
  border-radius: 1.5rem;
  color: ${(props) => props.theme["background"]};
  font-weight: bold;
  margin-top: 2rem;
  cursor: pointer;
  border: none;
`;
