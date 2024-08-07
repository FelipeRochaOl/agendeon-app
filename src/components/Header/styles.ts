import styled from "styled-components";

export const Container = styled.header`
  padding: 1rem 0;
  display: flex;
  align-items: center;

  img {
    margin-left: 2rem;
  }

  nav ul {
    margin-left: 3rem;
    display: flex;
    list-style: none;

    li {
      margin-left: 1rem;

      a {
        font-size: 0.9rem;
        font-weight: bold;
        color: ${(props) => props.theme["white"]};
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: ${(props) => props.theme["blue"]};
        }

        &.active {
          color: ${(props) => props.theme["blue"]};
        }
      }
    }
  }

  .login {
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
