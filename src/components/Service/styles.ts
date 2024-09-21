import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  background: ${(props) => props.theme["background"]};
  border-radius: 1.5rem;
  padding: 0.5rem;
  gap: 1rem;
  border: 1px solid transparent;
  transition: border 0.3s ease-in-out;
  margin-top: 1rem;

  .avatar {
    img {
      border-radius: 50%;
      width: 100px;
    }
  }

  &:hover {
    border: 1px solid ${(props) => props.theme["blue"]};
    transition: border 0.3s ease-in-out;
  }
`;

export const GridService = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto auto auto;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;

  strong {
    color: ${(props) => props.theme["blue"]};
    margin-right: 0.2rem;
  }
`;

export const GridItem = styled.div`
  display: flex;
  gap: 0.1rem;
  width: 100%;
  align-items: center;
`;

export const GridItemService = styled(GridItem)`
  grid-column: 1/3;
`;

export const ScheduleAvailable = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
