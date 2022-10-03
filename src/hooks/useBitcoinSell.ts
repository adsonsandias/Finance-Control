import React from "react";

export const useBitcoinSell = () => {
  const [bitcoinUSD, setBitcoinUSD] = React.useState({
    symbol: "",
    sell: 0,
  });
  const [bitcoinEUR, setBitcoinEUR] = React.useState({
    symbol: "",
    sell: 0,
  });
  const [bitcoinBRL, setBitcoinBRL] = React.useState({
    symbol: "",
    sell: 0,
  });

  React.useEffect(() => {
    fetch("https://blockchain.info/ticker")
      .then((response) => response.json())
      .then((bitcoin) => {
        setBitcoinUSD({
          symbol: bitcoin.USD.symbol,
          sell: bitcoin.USD.sell,
        });
        setBitcoinEUR({
          symbol: bitcoin.EUR.symbol,
          sell: bitcoin.EUR.sell,
        });
        setBitcoinBRL({
          symbol: bitcoin.BRL.symbol,
          sell: bitcoin.BRL.sell,
        });
      });
  }, []);

  return {
    bitcoinUSD,
    bitcoinEUR,
    bitcoinBRL,
  };
};
