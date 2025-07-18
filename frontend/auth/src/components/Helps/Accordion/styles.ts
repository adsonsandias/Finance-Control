import { motion } from "framer-motion";
import styled from "styled-components";

interface ISACTIVE {
  isActive: boolean;
}

export const AccordionContainer = styled(motion.div)<ISACTIVE>`
  h2 {
    display: flex;
    align-items: center;
    position: relative;

    svg {
      position: absolute;
      right: 1rem;
      max-width: 1rem;
      transition: all ease 0.3s;
      transform: ${(props) =>
        props.isActive === true ? "rotate(-90deg)" : "rotate(90deg)"};
    }
  }
`;

export const AccordionItem = styled.div`
  background: orange;
  padding: 2px;
`;

export const AccordionButton = styled(motion.button)`
  background: #f0f2f5;
  border: none;

  font-size: 1rem;
  color: var(--color-text-2);
  font-weight: 600;
  padding: 1rem 2rem;
  flex: 1;
  border-radius: 0.63rem;

  p {
    text-align: start;
    padding-right: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const AccordionContent = styled(motion.div)`
  background: #f0f2f5;
  color: var(--color-text-2);
  overflow: auto;
  height: 0px;
  opacity: 0;
  border-radius: 0rem;

  p {
    @media (max-width: 480px) {
      font-size: 0.88rem;
    }
  }
`;
