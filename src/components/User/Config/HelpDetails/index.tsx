import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../../assets/arrow-icon.svg";
import { Accordion } from "../../../Helps/Accordion";
import { containerLeft, item } from "../../../Helps/FrameMotion";
import { Context, Container, AccordionListStyle } from "./styles";

export function HelpDetails() {
  return (
    <Context
      className="container"
      variants={containerLeft}
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
