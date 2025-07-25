import { AreaChartItem } from './AreaChart'
import { BitcoinQuoteStyles, WalletStyles } from './styles'
import { PieChartItem } from './PieChart'
import { useBitcoinSell } from '../../hooks/useBitcoinSell'

export function BitcoinQuote() {
  const { bitcoinUSD, bitcoinEUR, bitcoinBRL } = useBitcoinSell()

  return (
    <>
      <BitcoinQuoteStyles>
        <h1>Cotação Bitcoin</h1>
        <div>
          <AreaChartItem
            symbol={bitcoinUSD.symbol}
            value={
              bitcoinUSD &&
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(bitcoinUSD?.sell)
            }
          />
          <AreaChartItem
            symbol={bitcoinEUR.symbol}
            value={
              bitcoinEUR &&
              new Intl.NumberFormat('en-150', {
                style: 'currency',
                currency: 'EUR',
              }).format(bitcoinEUR?.sell)
            }
          />
          <AreaChartItem
            symbol={bitcoinBRL.symbol}
            value={
              bitcoinBRL &&
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(bitcoinBRL?.sell)
            }
          />
        </div>
      </BitcoinQuoteStyles>
      <WalletStyles>
        <span>Carteira</span>
        <PieChartItem />
      </WalletStyles>
    </>
  )
}
