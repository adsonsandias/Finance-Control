import React from "react";

import iconTotal from "../../assets/dolar.svg";
import iconEntries from "../../assets/entrar.svg";
import iconOutputs from "../../assets/saida.svg";
import { TransactionsContext } from "../../TransactionsContext";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = React.useContext(TransactionsContext);

  console.log(transactions);

  return (
    <Container>
      <div>
        <div>
          <header>
            <p>Entradas</p>
            <img src={iconEntries} alt="Entradas de valores" />
          </header>
          <strong>
            R$ <span>4900,</span>00
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
            - R$ <span>900,</span>00
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
            R$ <span>42900,</span>00
          </strong>
        </div>
      </div>
    </Container>
  );
}
