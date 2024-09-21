import styled from "styled-components";

interface IButtonPropsHydrated {
  $color: "yellow" | "green";
}

export const Container = styled.button<IButtonPropsHydrated>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background-color: ${(props) => props.theme[props.$color]};
  border-radius: 1.5rem;
  color: ${(props) => props.theme["background"]};
  font-weight: bold;
  margin-top: 2rem;
  cursor: pointer;
  border: none;
`;
