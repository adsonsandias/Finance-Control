import { motion } from "framer-motion";
import styled from "styled-components";

interface ISACTIVE {
  isActive?: boolean;
}

export const Container = styled.nav`
  max-width: 1120px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  bottom: 1.88rem;
  height: 74px;
  position: fixed;
  right: 0;
  left: 0;
  @media (max-width: 480px) {
    bottom: 1rem;
    height: 64px;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0;
    background: var(--gradient-first);
    box-shadow: var(--box-shadow);
    border-radius: 1.56rem;
    gap: 12px;
    padding: 0.63rem 1rem;
    position: absolute;

    @media (max-width: 480px) {
      border-radius: 1.25rem;
    }
  }
`;

export const Button = styled(motion.button)<ISACTIVE>`
  display: block;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.6)" : " rgba(255, 255, 255, 0.3)"};
  padding: 0.38rem 0.94rem;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border: none;
  @media (max-width: 480px) {
    padding: 0.25rem 0.75rem;
    border-radius: 10px;
  }

  & svg {
    @media (max-width: 480px) {
      width: 32px;
      height: 32px;
    }
  }

  & svg path {
    fill-opacity: ${(props) => (props.isActive ? "1" : "0.8")};
    transition: fill ease 0.5s;
    fill: ${(props) =>
      props.isActive ? "var(--detail)" : "var(--background-white)"};
  }
  &:hover svg path {
    fill: var(--detail);
    fill-opacity: 1;
  }
`;
