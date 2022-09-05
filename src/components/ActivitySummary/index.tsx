import React from "react";

import { ReactComponent as CreditIcon } from "../../assets/credit-icon.svg";
import { ReactComponent as DepositIcon } from "../../assets/deposit-icon.svg";
import { ReactComponent as LogoImg } from "../../assets/logo-card.svg";
import { ReactComponent as TotalIcon } from "../../assets/total-icon.svg";
import { ReactComponent as WithdrawnIcon } from "../../assets/withdrawn-icon.svg";
import { SpendingItem } from "./SpendingItem";
import {
  Container,
  CartVirtual,
  CardContent,
  CardHeader,
  CardInfor,
  Spending,
} from "./styles";

export function ActivitySummary() {
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

      <Spending>
        <h1>Gastos</h1>
        <div>
          <ul>
            <SpendingItem
              title="Depositos"
              value="R$ 20.400,00"
              theme={{ icon: "var(--gradient-green)" }}
              icon={<DepositIcon />}
            />
            <SpendingItem
              title="Total"
              value="R$ 20.400,00"
              theme={{ icon: "var(--gradient-blue)" }}
              icon={<TotalIcon />}
            />
            <SpendingItem
              title="Saidas"
              value="R$ 20.400,00"
              theme={{ icon: "var(--gradient-red)" }}
              icon={<WithdrawnIcon />}
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
