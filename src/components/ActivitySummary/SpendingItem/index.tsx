import { motion } from "framer-motion";
import React from "react";
import { ThemeProvider } from "styled-components";

import { useWindowSize } from "../../../hooks/useWindowSize";
import { iconMotion, numberMotion } from "../animation";
import { SpendingItemStyles } from "./styles";

interface ISPENDINGPROPS {
  value: string;
  theme: unknown;
  title: string;
  icon: React.ReactNode;
}

export function SpendingItem({ ...props }: ISPENDINGPROPS) {
  const [width] = useWindowSize();
  const { value, theme, title, icon } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const isWidth = () => {
      if (width >= 1100) setIsOpen(true);
      else setIsOpen(false);
    };
    isWidth();
  }, [width]);

  return (
    <ThemeProvider theme={theme}>
      <SpendingItemStyles
        layout
        initial={{ width: "3.88rem" }}
        animate={{ width: isOpen ? "16rem" : "3.88rem" }}
        transition={{ type: "linear" }}
        theme={theme}
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
            {icon}
          </motion.div>
          <div>
            <motion.strong
              layout
              animate={isOpen ? "open" : "close"}
              variants={numberMotion}
            >
              {value}
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
              {title}
            </motion.span>
          </div>
        </motion.div>
      </SpendingItemStyles>
    </ThemeProvider>
  );
}
