import styled from "styled-components";

export const Container = styled.header`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme["blueDark"]};

  img {
    margin-left: 2rem;
  }

  .logout {
    margin-left: auto;
    margin-right: 2rem;
    padding: 0.5rem 2rem;
    background: ${(props) => props.theme["blueDark"]};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    font-weight: bold;
    font-size: 0.9rem;
    border: 1px solid transparent;

    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 0.5rem;
      margin-left: -1rem;
    }

    &:hover {
      border: 1px solid ${(props) => props.theme["blue"]};
      transition: border 0.2s;
    }
  }
`;
