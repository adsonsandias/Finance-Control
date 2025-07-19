import { ActivitySummary } from "../ActivitySummary";
import { TransactionSummary } from "../TransactionSummary";

// import { Summary } from "../Summary";
// import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";

export function Dashboard() {
  return (
    <Container>
      <ActivitySummary />
      <TransactionSummary />
      {/* <Summary /> */}
      {/* <TransactionsTable /> */}
    </Container>
  );
}
