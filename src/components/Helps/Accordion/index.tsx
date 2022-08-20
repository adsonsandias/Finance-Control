import { ReactComponent as ArrowIcon } from "../../../assets/arrow-icon.svg";
import {
  AccordionContainer,
  AccordionContent,
  AccordionButton,
} from "./styles";

type AccordionProps = {
  setActive: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  active: string;
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
  const { title, setActive, active, contents } = props;

  console.log(active === title);

  return (
    <AccordionContainer variants={item} isActive={active === title}>
      <h2>
        <AccordionButton
          isActive={active === title}
          type="button"
          onClick={() => setActive(title)}
        >
          <p>{title}</p>
        </AccordionButton>
        <ArrowIcon />
      </h2>

      <AccordionContent isActive={active === title}>
        <div>
          <p>{contents}</p>
        </div>
      </AccordionContent>
    </AccordionContainer>
  );
}
