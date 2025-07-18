import React from "react";

import { ReactComponent as ArrowIcon } from "../../../assets/arrow-icon.svg";
import { accodionButtonMotion, accodionContainerMotion } from "./animation";
import {
  AccordionContainer,
  AccordionContent,
  AccordionButton,
} from "./styles";

type AccordionProps = {
  title: string;
  contents: string;
};

// Animate the accordion
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function Accordion({ ...props }: AccordionProps) {
  const { title, contents } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AccordionContainer variants={item} isActive={isOpen}>
      <h2>
        <AccordionButton
          layout
          animate={isOpen ? "open" : "close"}
          variants={accodionButtonMotion}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{title}</p>
        </AccordionButton>
        <ArrowIcon />
      </h2>

      <AccordionContent
        layout
        animate={isOpen ? "open" : "close"}
        variants={accodionContainerMotion}
      >
        <div>
          <p>{contents}</p>
        </div>
      </AccordionContent>
    </AccordionContainer>
  );
}
