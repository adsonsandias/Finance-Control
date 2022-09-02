import { motion } from "framer-motion";
import React from "react";
import { ThemeProvider } from "styled-components";

import { ReactComponent as CreditIcon } from "../../assets/credit-icon.svg";
import { ReactComponent as DepositIcon } from "../../assets/deposit-icon.svg";
import { ReactComponent as LogoImg } from "../../assets/logo-card.svg";
import { ReactComponent as TotalIcon } from "../../assets/total-icon.svg";
import { ReactComponent as WithdrawnIcon } from "../../assets/withdrawn-icon.svg";
import { iconMotion, numberMotion } from "./animation";
import {
  Container,
  CartVirtual,
  CardContent,
  CardHeader,
  CardInfor,
  Spending,
  SpendingItem,
} from "./styles";

const theme = {
  icon: "var(--gradient-red)",
};

// const numberMotion = {
//   open: {
//     opacity: "1",
//     height: "100%",
//     transition: { type: "spring", stiffness: 700, damping: 30, delay: 0.25 },
//     transform: "translate(0rem,0rem)",
//   },
//   close: {
//     opacity: "0",
//     height: "0",
//     transform: "translate(0rem,2rem)",
//     transition: { type: "spring", stiffness: 700, damping: 30, delay: 0 },
//   },
// };

// const item = {
//   open: {
//     x: 0,
//     transform: "translate(0,0)",
//     display: "flex",
//     transition: {
//       y: { stiffness: 1000, velocity: -100 },
//     },
//   },
//   closed: {
//     x: "-100%",
//     display: "none",
//     transform: "translate(-1rem,-1.25rem)",
//     transition: {
//       y: { stiffness: 1000 },
//     },
//   },
// };

// const variants = {
//   open: { width: "16rem" },
//   closed: {
//     width: "3.63rem",
//     transition: {
//       width: 0.3,
//     },
//   },
// };

export function ActivitySummary() {
  const [isOpen, setIsOpen] = React.useState(false);

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
      <ThemeProvider theme={theme}>
        <Spending>
          <h1>Gastos</h1>
          <div>
            <ul>
              <SpendingItem
                layout
                initial={{ width: "3.88rem" }}
                animate={{ width: isOpen ? "16rem" : "3.88rem" }}
                transition={{ type: "linear" }}
                isActive={isOpen}
                theme={{ icon: "var(--gradient-green)" }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <motion.div
                  layout
                  initial={{ width: "2.63rem" }}
                  animate={{
                    widows: isOpen ? "100%" : "2.63rem",
                  }}
                >
                  <motion.div
                    layout
                    animate={isOpen ? "open" : "close"}
                    variants={iconMotion}
                  >
                    <DepositIcon />
                  </motion.div>
                  <div>
                    <motion.strong
                      layout
                      animate={isOpen ? "open" : "close"}
                      variants={numberMotion}
                    >
                      R$ 20.400,00
                    </motion.strong>
                    <motion.span
                      layout
                      initial={{
                        transform: "translate(-10.54rem, 0rem)",
                        textAlign: "start",
                        width: "3.4ch",
                        overflow: "hidden",
                      }}
                      animate={{
                        transform: isOpen
                          ? "translate(0rem,0rem)"
                          : "translate(-10.54rem, 0rem)",
                        width: isOpen ? "18ch" : "3.4ch",
                        overflow: isOpen ? "auto" : "hidden",
                        textAlign: isOpen ? "end" : "start",
                      }}
                    >
                      Depositos
                    </motion.span>
                  </div>
                </motion.div>
              </SpendingItem>
              <SpendingItem
                isActive={isOpen}
                theme={{ icon: "var(--gradient-red)" }}
              >
                <div>
                  <div>
                    <WithdrawnIcon />
                  </div>
                  <div>
                    <strong>R$ 20.400,00</strong>
                    <span>Depositos</span>
                  </div>
                </div>
              </SpendingItem>
              <SpendingItem
                isActive={isOpen}
                theme={{ icon: "var(--gradient-blue)" }}
              >
                <div>
                  <div>
                    <TotalIcon />
                  </div>
                  <div>
                    <strong>R$ 20.400,00</strong>
                    <span>Depositos</span>
                  </div>
                </div>
              </SpendingItem>
              <SpendingItem
                isActive={isOpen}
                theme={{ icon: "var(--gradient-purple)" }}
              >
                <div>
                  <div>
                    <CreditIcon />
                  </div>
                  <div>
                    <strong>R$ 20.400,00</strong>
                    <span>Depositos</span>
                  </div>
                </div>
              </SpendingItem>
            </ul>
          </div>
        </Spending>
      </ThemeProvider>
    </Container>
  );
}
