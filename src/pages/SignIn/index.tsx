/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Link, Navigate } from "react-router-dom";

import bglogin from "../../assets/bg-login.jpg";
import { ReactComponent as IconGithub } from "../../assets/github.svg";
import { ReactComponent as IconGoogle } from "../../assets/google.svg";
import { ReactComponent as LogoLogin } from "../../assets/logologin.svg";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import {
  BgloginStyles,
  Container,
  ContentBackground,
  ContentForm,
} from "../../components/Form/styles/global";
import { AuthContext } from "../../contexts/AuthContext";

export function Signin() {
  const { loading, setEmail, setPassword, signInEmail, signInGoogle, signed } =
    React.useContext(AuthContext);

  if (loading) return <>Carregando...</>;

  async function handleLoginFromGoogle() {
    await signInGoogle();
  }

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setEmail(email);
  }

  function onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setPassword(password);
  }

  if (!signed) {
    return (
      <Container>
        <ContentBackground>
          <div>
            <LogoLogin />
            <strong>
              <span>Finance</span>
              <span>Control</span>
            </strong>
          </div>
          <BgloginStyles
            className="bglogin"
            style={{
              backgroundImage: `url(${bglogin})`,
            }}
          />
        </ContentBackground>
        <ContentForm>
          <h1>Entrar</h1>
          <form onSubmit={signInEmail}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChangeEmail}
            />
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              name="password"
              onChange={onChangePassword}
            />
            <Button isActive="sign" type="submit" name="submit">
              Entrar
            </Button>
            <span>ou</span>
            <div>
              <Button
                isActive="button"
                type="button"
                name="submit"
                onClick={handleLoginFromGoogle}
              >
                <IconGoogle />
                Google
              </Button>
              <Button
                isActive="button"
                type="button"
                name="submit"
                onClick={handleLoginFromGoogle}
                disabled
              >
                <IconGithub />
                Github
              </Button>
            </div>
          </form>
          <p>
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </ContentForm>
      </Container>
    );
  }
  return <Navigate to="/" />;
}
