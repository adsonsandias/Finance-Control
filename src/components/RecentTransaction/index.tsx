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
        <h1>Recent Transaction</h1>
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
      </RecentTransactionItemStyles>
      <MonthTransactionItemStyles>
        <MonthTransaction />
      </MonthTransactionItemStyles>
    </>
  );
}
