import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background: ${(props) => props.theme["background"]};
  border-radius: 1rem;
  padding: 5px;
  gap: 1rem;
  border: 1px solid transparent;
  transition: border 0.3s ease-in-out;
  cursor: pointer;

  .avatar {
    img {
      border-radius: 50%;
      width: 60px;
    }
  }

  &:hover {
    border: 1px solid ${(props) => props.theme["blue"]};
    transition: border 0.3s ease-in-out;
  }
`;

export const GridUser = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  strong {
    color: ${(props) => props.theme["blue"]};
    margin-right: 0.2rem;
  }
`;

export const GridItem = styled.div`
  grid-column: 1/4;
  display: flex;
  gap: 0.1rem;
  width: 100%;
`;

export const GridItemName = styled(GridItem)`
  grid-column: 1;
  margin-bottom: 0.5rem;
`;

export const GridItemPhone = styled(GridItem)`
  grid-column: 3/4;
  grid-column: 1;
`;

export const ScheduleAvailable = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
