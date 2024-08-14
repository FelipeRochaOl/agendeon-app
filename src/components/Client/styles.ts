import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  background: ${(props) => props.theme["background"]};
  border-radius: 1rem;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid transparent;
  transition: border 0.3s ease-in-out;

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

export const GridClient = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto auto;
  justify-content: space-between;
  gap: 0.5rem;

  strong {
    color: ${(props) => props.theme["blue"]};
    margin-right: 0.2rem;
  }
`;

export const GridItem = styled.div`
  display: flex;
  gap: 0.1rem;
  width: 100%;
`;

export const GridItemName = styled(GridItem)`
  grid-column: 1/4;
  margin-bottom: 0.5rem;
`;

export const GridItemStreet = styled(GridItem)`
  grid-column: 1/3;
`;

export const GridItemPhone = styled(GridItem)`
  grid-column: 3/4;
`;

export const GridItemCellPhone = styled(GridItem)`
  grid-column: 3/5;
`;

export const PhoneWhatsapp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ScheduleAvailable = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
`;
