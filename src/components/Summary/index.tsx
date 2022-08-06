import React from "react";

import iconTotal from "../../assets/dolar.svg";
import iconEntries from "../../assets/entrar.svg";
import iconOutputs from "../../assets/saida.svg";
import { AuthContext } from "../../contexts/AuthContext";
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
      <div>
        <div>
          <header>
            <p>Entradas</p>
            <img src={iconEntries} alt="Entradas de valores" />
          </header>
          <strong>
            {dados &&
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(dados?.deposit)}
          </strong>
          <span>Última entrada dia 13 de abril</span>
        </div>
      </div>
      <div>
        <div>
          <header>
            <p>Saidas</p>
            <img src={iconOutputs} alt="Saida de valor" />
          </header>
          <strong>
            {dados &&
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(dados?.withdraw)}
          </strong>
          <span>Última entrada dia 13 de abril</span>
        </div>
      </div>
      <div>
        <div>
          <header>
            <p>Total</p>
            <img src={iconTotal} alt="Valor Total" />
          </header>
          <strong>
            {dados &&
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(dados?.total)}
          </strong>
          <span>Última entrada dia 13 de abril</span>
        </div>
      </div>
    </Container>
  );
}
