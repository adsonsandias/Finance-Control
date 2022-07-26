import React from "react";

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
          <button type="button">
            <IconHomer />
          </button>
        </li>
        <li>
          <button type="button" onClick={openTransactionModal}>
            <IconCalc />
          </button>
        </li>
        <li>
          <button type="button">
            <IconUser />
          </button>
        </li>
      </ul>
    </Container>
  );
}
