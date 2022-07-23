import styled from "styled-components";

export const Container = styled.form`
  background: var(--background);
  padding: 3rem;
  border-radius: 0.9rem;

  h2 {
    color: var(--color-text-2);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.94rem;
    transition: all ease 0.3s;

    border: 1px solid #d7d7d7;
    background: #e7e7e7;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--color-text-3);
    }

    & + input {
      margin-top: 1rem;
    }

    &:hover,
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 4px rgba(239, 239, 239, 0.8),
        0px 0px 0px 5px rgba(123, 123, 123, 0.5);
    }
  }
`;

export const BtnCadastrar = styled.button`
  font-weight: 700;
  letter-spacing: 0.1rem;
  width: 100%;
  padding: 0 1.5rem;
  height: 4rem;
  background: var(--gradient-green);
  color: #fff;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  margin-top: 1.5rem;

  transition: box-shadow ease 0.3s;

  &:focus,
  &:hover {
    outline: none;
    box-shadow: 0px 0px 0px 4px rgba(205, 255, 237, 0.8),
      0px 0px 0px 5px rgba(26, 181, 110, 0.5);
  }
`;

export const BtnChose = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 0.81rem;
  border: none;
  border-radius: 50%;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  transition: box-shadow ease 0.3s;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  @keyframes bgColor {
    from {
      background-color: transparent;
    }
    to {
      background-color: #ffe8e8;
    }
  }

  &:hover,
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0px 4px rgba(239, 239, 239, 0.8),
      inset 0px 0px 0px 5px rgba(255, 100, 100, 0.5);
    animation-name: bgColor;
  }

  img {
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(0.5turn);
    }
  }

  &:hover img,
  &:focus img {
    animation-name: rotate;
  }
`;