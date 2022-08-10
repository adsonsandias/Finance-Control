import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../assets/arrow-icon.svg";
import { ReactComponent as HelpIcon } from "../../../assets/help-icon.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/logout-icon.svg";
import fotoUser from "../../../assets/new-user.png";
import { ReactComponent as UserIcon } from "../../../assets/user-icon.svg";
import { ReactComponent as VersionIcon } from "../../../assets/version-icon.svg";
import { AuthContext } from "../../../contexts/AuthContext";
import { Config, Container, UserInfor } from "./styles";

export function UserProfile() {
  const { signOut, user } = React.useContext(AuthContext);
  const userLogado = JSON.parse(user as string);

  return (
    <Container>
      <UserInfor>
        <h1>Óla, Bem Vindo de volta 🤩</h1>
        {userLogado.photoURL ? (
          <img src={userLogado.photoURL} alt="Perfil de usúario" />
        ) : (
          <img src={fotoUser} alt="Perfil de usúario" />
        )}
        <h2>
          {userLogado.displayName ? userLogado.displayName : userLogado.email}
        </h2>
        <span>{userLogado.email && userLogado.email}</span>
      </UserInfor>
      <Config>
        <h1>Configuração</h1>
        <ul>
          <li>
            <Link to="login-details">
              <UserIcon />
              <h2>Login detalhes</h2>
              <p>Usuário e senha.</p>
              <ArrowIcon />
            </Link>
          </li>
          <li>
            <Link to="help-details">
              <HelpIcon />
              <h2>Help</h2>
              <p>Informações de ajuda.</p>
              <ArrowIcon />
            </Link>
          </li>
          <li>
            <Link to="version-detail">
              <VersionIcon />
              <h2>Versão do App</h2>
              <p>Beta 1.3.0</p>
              <ArrowIcon />
            </Link>
          </li>
        </ul>
        <button type="button" onClick={signOut}>
          <LogoutIcon />
          <h2>Sair da conta</h2>
        </button>
      </Config>
    </Container>
  );
}
