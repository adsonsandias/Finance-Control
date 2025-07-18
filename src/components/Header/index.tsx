import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import fotoUser from "../../assets/user-new.svg";
import { useAuthContext } from "../../presentation/contexts/AuthContext";
import { Container, Content, Logo, User } from "./styles";

export function Header() {
  const { signOut, user } = useAuthContext();
  const { pathname } = useLocation();

  if (!user) return null;

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
        {pathname === "/user" ||
        pathname === "/user/login-details" ||
        pathname === "/user/help-details" ||
        pathname === "/user/version-detail" ? (
          ""
        ) : (
          <User>
            <div>
              <span>{user.displayName || user.email}</span>
              <button type="button" onClick={signOut}>
                sair
              </button>
            </div>
            <Link
              to="/user"
              style={{
                backgroundImage: `url(${user.avatarUrl || fotoUser})`,
              }}
            />
          </User>
        )}
      </Content>
    </Container>
  );
}
