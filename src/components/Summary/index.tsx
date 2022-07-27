import React from "react";

import iconTotal from "../../assets/dolar.svg";
import iconEntries from "../../assets/entrar.svg";
import iconOutputs from "../../assets/saida.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposit += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposit: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <div>
          <header>
            <p>Entradas</p>
            <img src={iconEntries} alt="Entradas de valores" />
          </header>
          <strong>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.deposit)}
          </strong>
        </div>
      </div>
      <div>
        <div>
          <header>
            <p>Saidas</p>
            <img src={iconOutputs} alt="Saida de valor" />
          </header>
          <strong>
            -{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.withdraws)}
          </strong>
        </div>
      </div>
      <div>
        <div>
          <header>
            <p>Total</p>
            <img src={iconTotal} alt="Valor Total" />
          </header>
          <strong>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.total)}
          </strong>
        </div>
      </div>
    </Container>
  );
}
