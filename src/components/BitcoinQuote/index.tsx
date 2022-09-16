import { AreaChartItem } from "./AreaChart";
import { PieChartItem } from "./PieChart";
import { BitcoinQuoteStyles, WalletStyles } from "./styles";

export function BitcoinQuote() {
  return (
    <>
      <BitcoinQuoteStyles>
        <h1>Cotação Bitcoin</h1>
        <div>
          <AreaChartItem />
          <AreaChartItem />
          <AreaChartItem />
        </div>
      </BitcoinQuoteStyles>
      <WalletStyles>
        <span>Carteira</span>
        <PieChartItem />
      </WalletStyles>
    </>
  );
}
