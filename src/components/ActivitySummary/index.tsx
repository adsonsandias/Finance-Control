import React from "react";

import { ReactComponent as CreditIcon } from "../../assets/credit-icon.svg";
import { ReactComponent as DepositIcon } from "../../assets/deposit-icon.svg";
import { ReactComponent as LogoImg } from "../../assets/logo-card.svg";
import { ReactComponent as TotalIcon } from "../../assets/total-icon.svg";
import { ReactComponent as WithdrawnIcon } from "../../assets/withdrawn-icon.svg";
import { AuthContext } from "../../contexts/AuthContext";
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
  const { userCollection } = React.useContext(AuthContext);
  const [dados, setDados] = React.useState({
    deposit: 0,
    withdraw: 0,
    total: 0,
  });

  React.useEffect(() => {
    const summary = userCollection.reduce(
      (acc, transaction) => {
        if (transaction.type === "deposit") {
          acc.deposit += transaction.amount;
          acc.total += transaction.amount;
        } else if (transaction.type === "withdraw") {
          acc.withdraw += transaction.amount;
          acc.total -= transaction.amount;
        } else {
          return acc;
        }

        return acc;
      },
      {
        deposit: 0,
        withdraw: 0,
        total: 0,
      }
    );

    setDados({
      deposit: summary.deposit,
      withdraw: summary.withdraw,
      total: summary.total,
    });
  }, [userCollection]);

  return (
    <Container>
      <CartVirtual>
        <h1>Cartão Virtual</h1>
        <CardContent>
          <div>
            <CardHeader>
              <span>Adson Santos</span>
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
                }).format(dados?.deposit)
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
                }).format(dados?.withdraw)
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
