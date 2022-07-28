import React from "react";

import { useTransactions } from "../../hooks/useTransactions";
import { Container, MobileTitle } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <MobileTitle>
        <h1>Transactions</h1>
        <span>4 itens</span>
      </MobileTitle>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction?.id}>
                <td>{transaction?.title}</td>
                <td className={transaction?.type}>
                  {transaction &&
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(transaction.amount)}
                </td>
                <td>{transaction?.category}</td>
                <td>
                  {transaction &&
                    new Intl.DateTimeFormat("pt-BR").format(
                      new Date(transaction?.createdAt)
                    )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
