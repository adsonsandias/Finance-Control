import styled from "styled-components";

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  width: 100%;
  flex: 1;
  padding-bottom: 6.5rem;
  @media (max-width: 1100px) {
    padding: 0;
    padding-bottom: 8rem;
  }
`;
