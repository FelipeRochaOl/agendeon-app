import styled from "styled-components";

interface IContainerLoginHydrated {
  $display: boolean;
}

export const Container = styled.div<IContainerLoginHydrated>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.9);
  display: ${(props) => (props.$display ? "flex" : "none")};
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  min-width: 500px;
  padding: 1rem;
  overflow: scroll;

  h1 {
    color: ${(props) => props.theme["blue"]};
    font-size: 3rem;
  }

  .MuiFormControl-root {
    margin-top: 1rem;
  }

  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;

    legend {
      color: ${(props) => props.theme["blue"]};
      font-size: 1rem;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 3rem;
  gap: 1rem;
`;
