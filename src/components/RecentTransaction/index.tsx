import { MonthTransaction } from "./MonthTransaction";
import {
  RecentTransactionItemStyles,
  MonthTransactionItemStyles,
} from "./styles";
import { TransactionItem } from "./TransactionItem";

export function RecentTransaction() {
  return (
    <>
      <RecentTransactionItemStyles>
        <h1>Recentes Transações</h1>
        <TransactionItem type="productivity" category="deposit" />
        <TransactionItem type="food" category="withdraw" />
        <TransactionItem type="shopping" category="withdraw" />
      </RecentTransactionItemStyles>
      <MonthTransactionItemStyles>
        <MonthTransaction />
      </MonthTransactionItemStyles>
    </>
  );
}
