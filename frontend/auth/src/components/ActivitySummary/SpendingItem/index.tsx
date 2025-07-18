import { motion } from "framer-motion";
import React from "react";
import { ThemeProvider } from "styled-components";

import { useWindowSize } from "../../../hooks/useWindowSize";
import {
  bgGradientMotion,
  bgWhiteMotion,
  iconMotion,
  numberMotion,
  titleMotion,
} from "../animation";
import { SpendingItemStyles } from "./styles";

interface ISPENDINGPROPS {
  value: string;
  theme: object;
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
        animate={isOpen ? "open" : "close"}
        variants={bgGradientMotion}
        theme={theme}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          layout
          animate={isOpen ? "open" : "close"}
          variants={bgWhiteMotion}
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
              animate={isOpen ? "active" : "inactive"}
              variants={titleMotion}
            >
              {title}
            </motion.span>
          </div>
        </motion.div>
      </SpendingItemStyles>
    </ThemeProvider>
  );
}
