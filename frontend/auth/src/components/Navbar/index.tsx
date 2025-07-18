import { transform } from "framer-motion";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { IconCalc } from "./Icons/IconCalc";
import { IconHomer } from "./Icons/IconsHomer";
import { IconUser } from "./Icons/IconUser";
import { Button, Container } from "./styles";

interface INAVBARPROPS {
  openTransactionModal: () => void;
}

export function Navbar({ openTransactionModal }: INAVBARPROPS) {
  const { pathname } = useLocation();

  // FrameMotion
  const backgroundColor = transform(
    [0, 100],
    [" rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.6)"]
  )(50);

  return (
    <Container>
      <ul>
        <li>
          <Link to="/">
            <Button
              type="button"
              isActive={pathname === "/"}
              whileHover={{ scale: 1.1, backgroundColor }}
              whileTap={{ scale: 0.9 }}
            >
              <IconHomer />
            </Button>
          </Link>
        </li>
        <li>
          <Button
            type="button"
            onClick={openTransactionModal}
            whileHover={{ scale: 1.1, backgroundColor }}
            whileTap={{ scale: 0.9 }}
          >
            <IconCalc />
          </Button>
        </li>
        <li>
          <Link to="/user">
            <Button
              type="button"
              isActive={pathname === "/user"}
              whileHover={{ scale: 1.1, backgroundColor }}
              whileTap={{ scale: 0.9 }}
            >
              <IconUser />
            </Button>
          </Link>
        </li>
      </ul>
    </Container>
  );
}
