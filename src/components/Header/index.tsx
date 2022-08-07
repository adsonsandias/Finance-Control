import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import fotoUser from "../../assets/user-new.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Content, Logo, User } from "./styles";

export function Header() {
  const { signOut, user } = React.useContext(AuthContext);
  const userLogado = JSON.parse(user as string);
  const { pathname } = useLocation();

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
        {pathname === "/user" ? (
          ""
        ) : (
          <User>
            <div>
              <span>
                {userLogado.displayName
                  ? userLogado.displayName
                  : userLogado.email}
              </span>
              <button type="button" onClick={signOut}>
                sair
              </button>
            </div>
            <Link to="/user">
              <img
                src={userLogado.photoURL ? userLogado.photoURL : fotoUser}
                alt="Perfil de usúario"
              />
            </Link>
          </User>
        )}
      </Content>
    </Container>
  );
}
