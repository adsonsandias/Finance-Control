import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.section)`
  padding: 4rem;
  max-width: 1120px;
  background: white;
  margin: 0 auto;
  flex: 1;
  display: grid;
  width: 100%;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  /* margin-top: -8rem; */
  margin-bottom: 1.75rem;
  box-shadow: 10px 15px 25px rgba(192, 192, 192, 0.25),
    -10px -5px 25px rgba(228, 228, 228, 0.25);
  border-radius: 1.56rem;

  @media (max-width: 1180px) {
    width: initial;
  }
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 830px) {
    width: initial;
    padding: 2rem;
  }

  @media (max-width: 780px) {
    width: initial;
  }
  @media (max-width: 630px) {
    position: relative;
  }

  @media (max-width: 480px) {
    width: initial;
    padding: 0rem;
    background: transparent;
    box-shadow: initial;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`;
