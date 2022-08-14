import styled from "styled-components";

interface ISACTIVE {
  isActive: boolean;
  title?: string | undefined;
}

export const AccordionContainer = styled.div<ISACTIVE>`
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

export const AccordionButton = styled.button<ISACTIVE>`
  background: #f0f2f5;
  border: none;
  font-size: 1rem;
  color: var(--color-text-2);
  font-weight: 600;
  padding: 1rem 2rem;
  flex: 1;
  border-radius: 0.63rem;
  border-radius: ${(props) =>
    props.isActive === true ? "0.63rem 0.63rem 0 0" : "0.63rem"};

  p {
    text-align: start;
  }
`;

export const AccordionContent = styled.div<ISACTIVE>`
  background: #f0f2f5;
  color: var(--color-text-2);
  padding: 2rem;
  padding: ${(props) => (props.isActive === true ? "1rem 2rem" : "0rem")};
  overflow: auto;
  transition: all 0.3s ease;
  height: ${(props) => (props.isActive === true ? "250px" : "0px")};
  opacity: ${(props) => (props.isActive === true ? "1" : "0")};
  border-radius: ${(props) =>
    props.isActive === true ? "0 0 0.63rem 0.63rem " : "0rem"};
`;
