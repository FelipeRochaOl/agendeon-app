import styled from "styled-components";

interface IHydratatedCheckboxProps {
  $checked: boolean;
}

export const Container = styled.div<IHydratatedCheckboxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.$checked ? props.theme["yellow"] : props.theme["background"]};
  border-radius: 20px;
  max-width: 220px;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    border: 1px solid
      ${(props) =>
        props.$checked ? props.theme["yellow"] : props.theme["blue"]};
    transition: border 0.3s ease-in-out;
  }

  input {
    appearance: none;
    display: none;
  }

  span {
    font-weight: bold;
    margin-left: 0.5rem;
    color: ${(props) => (props.$checked ? "black" : "white")};
  }
`;
