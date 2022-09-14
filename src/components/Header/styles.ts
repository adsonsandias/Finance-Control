import styled from "styled-components";

export const Container = styled.header`
  background: var(--gradient-first);
`;

export const Content = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem 1rem 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 2rem 1rem 8rem;
    max-height: 12.5rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 4rem;
    @media (max-width: 480px) {
      max-width: 2.63rem;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    @media (max-width: 480px) {
      margin-left: 0.75rem;
    }
  }
  div span {
    font-weight: 600;
    font-size: 1.13rem;
    color: var(--color-text-1);
    &:nth-child(2n + 0) {
      margin-left: 2.63rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
      &:nth-child(2n + 0) {
        margin-left: 1.5rem;
      }
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

    @media (max-width: 480px) {
      display: none;
    }

    span {
      font-size: 1rem;
      color: var(--color-text-1);
      font-weight: 600;
    }

    button {
      border: none;
      color: var(--color-text-1);
      font-weight: 400;
      padding: 0.25rem 0.5rem;
      transform: scale(0.9);
      transition: transform 0.3s ease;
      background: transparent;
      border-radius: 0.5rem;

      &:hover {
        transform: scale(1);
        background: rgba(255, 255, 255, 0.2);
      }
      &:focus {
        box-shadow: 0px 0px 0px 4px rgba(255, 201, 142, 0.8),
          0px 0px 0px 5px rgba(250, 131, 65, 0.5);
        outline: none;
      }
    }
  }
  a {
    width: 3.75rem;
    height: 3.75rem;
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
    @media (max-width: 480px) {
      max-width: 2.5rem;
      height: 2.5rem;
    }
  }
`;
