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
  bottom: 6rem;
  position: fixed;
  right: 0;
  left: 0;

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
    padding: 0.6rem 1rem;
    position: absolute;
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
