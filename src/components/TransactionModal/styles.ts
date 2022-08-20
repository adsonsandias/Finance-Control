import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.form`
  background: var(--background);
  padding: 3rem;
  border-radius: 0.9rem;
  @media (max-width: 480px) {
    padding: 2rem;
  }

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
    display: block;
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

export const IncomeDiscountsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin: 1rem 0;
`;

interface IBTNTYPETRANSITIONPROPS {
  isActive: boolean;
}

export const BtnTypeTransition = styled.button<IBTNTYPETRANSITIONPROPS>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7d7d7;
  border-radius: 0.94rem;
  height: 4rem;

  transition: box-shadow ease 0.3s;

  &:first-child {
    background: ${(props) =>
      props.isActive ? "rgba(157, 216, 193, 0.3)" : "transparent"};
    border: 1px solid ${(props) => (props.isActive ? "#63D094" : "d7d7d7")};
  }

  &:last-child {
    background: ${(props) =>
      props.isActive ? "rgba(255, 197, 206, 0.3)" : "transparent"};
    border: 1px solid ${(props) => (props.isActive ? "#F18F9F" : "d7d7d7")};
  }

  &:last-child:hover,
  &:last-child:focus {
    outline: none;
    box-shadow: ${(props) =>
      props.isActive
        ? " 0px 0px 0px 4px rgba(255, 219, 219, 0.5), 0px 0px 0px 5px rgba(226, 180, 180, 0.8)"
        : "0px 0px 0px 4px rgba(239, 239, 239, 0.8), 0px 0px 0px 5px rgba(123, 123, 123, 0.5)"};
  }

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${(props) =>
      props.isActive
        ? "0px 0px 0px 4px rgba(219, 255, 235, 0.5), 0px 0px 0px 5px rgba(180, 226, 201, 0.8)"
        : "0px 0px 0px 4px rgba(239, 239, 239, 0.8), 0px 0px 0px 5px rgba(123, 123, 123, 0.5)"};
  }

  @keyframes imgJumpDown {
    0% {
      transform: translateY(-10px);
      opacity: 0.5;
    }
    60% {
      transform: translateY(5px);
    }
    90% {
      transform: translateY(3px);
    }
    90% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes imgJumpUp {
    0% {
      transform: translateY(10px);
      opacity: 0.5;
    }
    60% {
      transform: translateY(-5px);
    }
    90% {
      transform: translateY(-3px);
    }
    90% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  img {
    width: 20px;
    height: 20px;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    opacity: 1;
  }

  &:hover img,
  &:focus img {
    animation-name: ${(props) =>
      props.isActive ? "imgJumpUp" : "imgJumpDown"};
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--color-text-2);
  }
`;

export const ModalBackground = styled(motion.div)`
  background: var(--gradient-first);
  padding: 0.25rem;
  box-shadow: var(--box-shadow);
  border-radius: 0.94rem;
  position: relative;
`;
