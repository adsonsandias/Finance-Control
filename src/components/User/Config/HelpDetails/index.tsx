import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../../assets/arrow-icon.svg";
import { Accordion } from "../../../Helps/Accordion";
import { container, item } from "../../../Helps/FrameMotion";
import { Context, Container, AccordionListStyle } from "./styles";

export function HelpDetails() {
  const [active, setActive] = React.useState(
    "Por que não posso altera as informação ?"
  );

  return (
    <Context
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <header>
        <nav aria-label="Navigate to Help Details">
          <ul>
            <li>
              <Link to="/user">
                <ArrowIcon />
                <span>Versão do App</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Container>
        <motion.div variants={item}>
          <h1>F.A.Q</h1>
          <span>Perguntas Freqüentes</span>
        </motion.div>
        <AccordionListStyle>
          <Accordion
            title="Por que não posso altera as informação ?"
            active={active}
            setActive={setActive}
            contents="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe harum
            nesciunt quas iusto earum placeat, eos est similique, quibusdam
            neque debitis amet veritatis sit architecto obcaecati atque autem
            minus! Deleniti? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Quisquam accusamus magnam necessitatibus error laboriosam
            soluta repudiandae, nemo ut temporibus ipsum maxime consectetur
            perspiciatis a nostrum eaque totam ducimus similique beatae."
          />
          <Accordion
            title="Posso logar com a conta google ?"
            active={active}
            setActive={setActive}
            contents="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe harum
            nesciunt quas iusto earum placeat, eos est similique, quibusdam
            neque debitis amet veritatis sit architecto obcaecati atque autem
            minus! Deleniti? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Quisquam accusamus magnam necessitatibus error laboriosam
            soluta repudiandae, nemo ut temporibus ipsum maxime consectetur
            perspiciatis a nostrum eaque totam ducimus similique beatae."
          />
          <Accordion
            title="Por que o login com Github não funciona ?"
            active={active}
            setActive={setActive}
            contents="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe harum
            nesciunt quas iusto earum placeat, eos est similique, quibusdam
            neque debitis amet veritatis sit architecto obcaecati atque autem
            minus! Deleniti? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Quisquam accusamus magnam necessitatibus error laboriosam
            soluta repudiandae, nemo ut temporibus ipsum maxime consectetur
            perspiciatis a nostrum eaque totam ducimus similique beatae."
          />
          <Accordion
            title="Porque não posso alterar meu
            nome de usuario ?"
            active={active}
            setActive={setActive}
            contents="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe harum
            nesciunt quas iusto earum placeat, eos est similique, quibusdam
            neque debitis amet veritatis sit architecto obcaecati atque autem
            minus! Deleniti? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Quisquam accusamus magnam necessitatibus error laboriosam
            soluta repudiandae, nemo ut temporibus ipsum maxime consectetur
            perspiciatis a nostrum eaque totam ducimus similique beatae."
          />
        </AccordionListStyle>
      </Container>
    </Context>
  );
}
