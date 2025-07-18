import React from "react";

import { ITransaction } from "../../domain/entities/Transaction";
import { useTransactionContext } from "../../presentation/contexts/TransactionContext";
import { Loading } from "../Loading";
import { MonthTransaction } from "./MonthTransaction";
import {
  RecentTransactionItemStyles,
  MonthTransactionItemStyles,
} from "./styles";
import { TransactionItem } from "./TransactionItem";

export function RecentTransaction() {
  const { transactions, isLoading, loadTransactions } = useTransactionContext();

  React.useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  if (isLoading) return <Loading />;
  return (
    <>
      <RecentTransactionItemStyles>
        <h1>Recentes Transações</h1>
        {transactions &&
          transactions.map(
            ({
              id,
              title,
              type,
              amount,
              category,
              createdAt,
            }: ITransaction) => (
              <TransactionItem
                key={id}
                title={title}
                type={type}
                category={category}
                value={
                  amount
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(amount)
                    : "R$ 0,00"
                }
                date={
                  createdAt
                    ? new Intl.DateTimeFormat("pt-BR").format(
                        new Date(createdAt)
                      )
                    : ""
                }
              />
            )
          )}
      </RecentTransactionItemStyles>
      <MonthTransactionItemStyles>
        <MonthTransaction />
      </MonthTransactionItemStyles>
    </>
  );
}
