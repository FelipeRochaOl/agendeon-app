import styled from "styled-components";

interface IContainerConfirmHydrated {
  $display: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  padding: 0.5rem 2rem;
  margin: 0 auto;
`;

export const ContainerConfirm = styled.div<IContainerConfirmHydrated>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$display ? "flex" : "none")};
  cursor: pointer;
`;

export const ConfirmMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  background: ${(props) => props.theme["background"]};
  border-radius: 3rem;
  max-width: 500px;
  width: 100%;

  span {
    margin-left: 1rem;
    font-size: 1.3rem;
  }
`;

export const ServiceForm = styled.form``;
