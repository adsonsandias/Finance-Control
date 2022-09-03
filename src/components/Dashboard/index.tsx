import { ActivitySummary } from "../ActivitySummary";
import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";

export function Dashboard() {
  return (
    <Container>
      <ActivitySummary />
      {/* <Summary /> */}
      {/* <TransactionsTable /> */}
    </Container>
  );
}
