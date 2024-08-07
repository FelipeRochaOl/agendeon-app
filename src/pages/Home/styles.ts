import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  min-height: 800px;
  flex: 1;
`;

export const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;

  h4 {
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 2.5rem;
    background-color: ${(props) => props.theme["yellow"]};
    border-radius: 1.5rem;
    color: ${(props) => props.theme["background"]};
    font-weight: bold;
    margin-top: 2rem;
  }

  a:hover {
    background-color: ${(props) => props.theme["orange"]};
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 1rem;
  color: ${(props) => props.theme["title"]};

  span {
    color: ${(props) => props.theme["blue"]};
  }
`;

export const ImageSection = styled.section``;
