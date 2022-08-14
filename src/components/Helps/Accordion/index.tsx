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

export function Accordion({ ...props }: AccordionProps) {
  const { title, setActive, active, contents } = props;

  console.log(active === title);

  return (
    <AccordionContainer isActive={active === title}>
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
