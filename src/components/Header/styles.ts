import styled from "styled-components";

export const Container = styled.header`
  background: var(--gradient-first);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 4rem;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }
  div span {
    font-weight: 600;
    font-size: 1.13rem;
    color: var(--color-text-1);
    &:nth-child(2n + 0) {
      margin-left: 2.63rem;
    }
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 1rem;

    span {
      font-size: 1rem;
      color: var(--color-text-1);
      font-weight: 600;
    }

    a {
      text-decoration: none;
      color: var(--color-text-1);
      font-weight: 400;
      padding: 0.2rem;
      transform: scale(0.9);
      transition: transform 0.3s ease;
      background: transparent;
      border-radius: 0.5rem;

      &:hover {
        transform: scale(1);
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
  img {
    max-width: 3.75rem;
    background-size: cover;
    background-position: center center;
  }
`;
