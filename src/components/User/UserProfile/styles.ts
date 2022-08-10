import styled from "styled-components";

export const Container = styled.section`
  padding: 4rem;
  max-width: 1120px;
  background: white;
  margin: 0 auto;
  flex: 1;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  margin-top: -8rem;
  margin-bottom: 7rem;
  border-radius: 1.56rem;
`;

export const UserInfor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    width: 20ch;
    text-align: center;
    align-items: center;
    font-size: 1.63rem;
    font-weight: 500;
    margin-bottom: 2.63rem;
    color: var(--color-text-2);
  }

  img {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.63rem;
    color: var(--color-text-2);
  }

  span {
    font-size: 1rem;
    color: var(--color-text-3);
  }
`;

export const Config = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    align-items: center;
    font-size: 1.63rem;
    font-weight: 500;
    margin-bottom: 2rem;
    color: var(--color-text-2);
  }

  ul {
    list-style: none;

    li a {
      display: grid;
      grid-template-columns: auto 1fr auto;
      background: #f4f4f4;
      padding: 1rem 2rem;
      border-radius: 0.94rem;
      justify-content: center;
      align-items: center;
      text-decoration: none;

      svg:first-child {
        grid-area: span 2;
        margin-right: 2rem;
      }

      svg:last-child {
        grid-area: span 2;
      }

      h2 {
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text-2);
      }

      p {
        font-size: 0.88rem;
        color: var(--color-text-3);
        grid-area: 2/2;
      }
    }
    li + li {
      margin-top: 1rem;
    }
  }

  button {
    display: flex;
    background: #f4f4f4;
    padding: 1.66rem 2rem;
    border-radius: 0.94rem;
    justify-content: center;
    align-items: center;
    border: none;
    margin-top: 1rem;

    svg {
      margin-right: 1rem;
    }

    h2 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-2);
    }
  }
`;
