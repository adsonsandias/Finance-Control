import { BitcoinQuote } from "../BitcoinQuote";
import { RecentTransaction } from "../RecentTransaction";
import { Container } from "./styles";

export function TransactionSummary() {
  return (
    <Container>
      <BitcoinQuote />
      <RecentTransaction />
    </Container>
  );
}
