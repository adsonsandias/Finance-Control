import { motion } from "framer-motion";
import React from "react";

import iconTotal from "../../assets/dolar.svg";
import iconEntries from "../../assets/entrar.svg";
import iconOutputs from "../../assets/saida.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { container, item } from "../Helps/FrameMotion";
import { Container } from "./styles";

export function Summary() {
  const { userCollection } = React.useContext(AuthContext);
  const [dados, setDados] = React.useState({
    deposit: 0,
    withdraw: 0,
    total: 0,
  });

  React.useEffect(() => {
    const summary = userCollection.reduce(
      (acc, transaction) => {
        if (transaction.type === "deposit") {
          acc.deposit += transaction.amount;
          acc.total += transaction.amount;
        } else if (transaction.type === "withdraw") {
          acc.withdraw += transaction.amount;
          acc.total -= transaction.amount;
        } else {
          return acc;
        }

        return acc;
      },
      {
        deposit: 0,
        withdraw: 0,
        total: 0,
      }
    );

    setDados({
      deposit: summary.deposit,
      withdraw: summary.withdraw,
      total: summary.total,
    });
  }, [userCollection]);

  return (
    <Container>
      <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.header variants={item}>
            <p>Entradas</p>
            <img src={iconEntries} alt="Entradas de valores" />
          </motion.header>
          <motion.strong variants={item}>
            {dados &&
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(dados?.deposit)}
          </motion.strong>
          <span>Última entrada dia 13 de abril</span>
        </div>
      </motion.div>
      <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.header variants={item}>
            <p>Saidas</p>
            <img src={iconOutputs} alt="Saida de valor" />
          </motion.header>
          <motion.strong variants={item}>
            {dados &&
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(dados?.withdraw)}
          </motion.strong>
          <span>Última entrada dia 13 de abril</span>
        </div>
      </motion.div>
      <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.header variants={item}>
            <p>Total</p>
            <img src={iconTotal} alt="Valor Total" />
          </motion.header>
          <motion.strong variants={item}>
            {dados &&
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(dados?.total)}
          </motion.strong>
          <span>Última entrada dia 13 de abril</span>
        </div>
      </motion.div>
    </Container>
  );
}
