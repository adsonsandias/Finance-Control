import React from "react";
import { Link } from "react-router-dom";

import { IconCalc } from "./Icons/IconCalc";
import { IconHomer } from "./Icons/IconsHomer";
import { IconUser } from "./Icons/IconUser";
import { Container } from "./styles";

interface INAVBARPROPS {
  openTransactionModal: () => void;
}

export function Navbar({ openTransactionModal }: INAVBARPROPS) {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/">
            <button type="button">
              <IconHomer />
            </button>
          </Link>
        </li>
        <li>
          <button type="button" onClick={openTransactionModal}>
            <IconCalc />
          </button>
        </li>
        <li>
          <Link to="/user">
            <button type="button">
              <IconUser />
            </button>
          </Link>
        </li>
      </ul>
    </Container>
  );
}
