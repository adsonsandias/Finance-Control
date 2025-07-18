import React from "react";

import { ITransaction } from "../../domain/entities/Transaction";
import { ReactComponent as CreditIcon } from "../../assets/credit-icon.svg";
import { ReactComponent as DepositIcon } from "../../assets/deposit-icon.svg";
import { ReactComponent as LogoImg } from "../../assets/logo-card.svg";
import { ReactComponent as TotalIcon } from "../../assets/total-icon.svg";
import { ReactComponent as WithdrawnIcon } from "../../assets/withdrawn-icon.svg";
import { useTransactionContext } from "../../presentation/contexts/TransactionContext";
import { useAuthContext } from "../../presentation/contexts/AuthContext";
import { SpendingItem } from "./SpendingItem";
import {
  Container,
  CartVirtual,
  CardContent,
  CardHeader,
  CardInfor,
  Spending,
  TitleMobile,
} from "./styles";

export function ActivitySummary() {
  const { transactions, summary, loadSummary } = useTransactionContext();
  const { user } = useAuthContext();
  const [dados, setDados] = React.useState({
    income: 0,
    expense: 0,
    total: 0,
  });

  React.useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  React.useEffect(() => {
    if (summary) {
      setDados({
        income: summary.totalIncome || 0,
        expense: summary.totalExpense || 0,
        total: (summary.totalIncome || 0) - (summary.totalExpense || 0),
      });
    } else if (transactions) {
      const calculatedSummary = transactions.reduce(
        (
          acc: { income: number; expense: number; total: number },
          transaction: ITransaction
        ) => {
          if (transaction.type === "income") {
            acc.income += transaction.amount;
            acc.total += transaction.amount;
          } else if (transaction.type === "expense") {
            acc.expense += transaction.amount;
            acc.total -= transaction.amount;
          }
          return acc;
        },
        {
          income: 0,
          expense: 0,
          total: 0,
        }
      );
      setDados(calculatedSummary);
    }
  }, [summary, transactions]);

  return (
    <Container>
      <CartVirtual>
        <h1>Cartão Virtual</h1>
        <CardContent>
          <div>
            <CardHeader>
              <span>{user?.displayName || user?.email || "Usuário"}</span>
              <LogoImg />
            </CardHeader>
            <span>**** **** **** 8913</span>
            <CardInfor>
              <div>
                <span>exp date</span>
                <span>02/26</span>
              </div>
              <div>
                <span>exp date</span>
                <span>432</span>
              </div>
            </CardInfor>
          </div>
        </CardContent>
      </CartVirtual>
      <TitleMobile>Gastos</TitleMobile>
      <Spending>
        <h1>Gastos</h1>
        <div>
          <ul>
            <SpendingItem
              title="Depositos"
              value={
                dados &&
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(dados?.income)
              }
              theme={{ icon: "var(--gradient-green)" }}
              icon={<DepositIcon />}
            />
            <SpendingItem
              title="Saidas"
              value={
                dados &&
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(dados?.expense)
              }
              theme={{ icon: "var(--gradient-red)" }}
              icon={<WithdrawnIcon />}
            />
            <SpendingItem
              title="Total"
              value={
                dados &&
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(dados?.total)
              }
              theme={{ icon: "var(--gradient-blue)" }}
              icon={<TotalIcon />}
            />
            <SpendingItem
              title="Fatura crédito"
              value="R$ 20.400,00"
              theme={{ icon: "var(--gradient-purple)" }}
              icon={<CreditIcon />}
            />
          </ul>
        </div>
      </Spending>
    </Container>
  );
}
