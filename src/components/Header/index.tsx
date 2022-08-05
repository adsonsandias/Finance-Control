import React from "react";

import logoImg from "../../assets/logo.svg";
import fotoUser from "../../assets/user.png";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Content, Logo, User } from "./styles";

export function Header() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <Container>
      <Content>
        <Logo>
          <img src={logoImg} alt="Finance Control" />
          <div>
            <span>Finance</span>
            <span>Control</span>
          </div>
        </Logo>
        <User>
          <div>
            <span>Adson Santos</span>
            <button type="button" onClick={signOut}>
              sair
            </button>
          </div>
          <img src={fotoUser} alt="Perfil de usúario" />
        </User>
      </Content>
    </Container>
  );
}
