import styled from "styled-components";

export const Container = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: -8rem;

  & > div {
    background: var(--gradient-first);
    padding: 0.25rem;
    box-shadow: var(--box-shadow);
    border-radius: 1.6rem;
    display: flex;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--background-white);
      padding: 1.5rem 2rem;
      border-radius: 1.56rem;

      header {
        flex: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;

        p {
          font-size: 1rem;
        }

        img {
          max-width: 40px;
          padding: 0.25rem;
        }
      }

      strong {
        color: var(--color-text-2);
        font-size: 2.25rem;
        font-weight: 400;
        letter-spacing: 0.03rem;

        span {
          font-weight: 600;
        }
      }
    }
  }
`;
