import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import bglogin from "../../assets/bg-login.jpg";
import { ReactComponent as IconGithub } from "../../assets/github.svg";
import { ReactComponent as IconGoogle } from "../../assets/google.svg";
import { ReactComponent as LogoLogin } from "../../assets/logologin.svg";
import { Button } from "../../components/Form/Button";
import {
  BgloginStyles,
  Container,
  ContentBackground,
  ContentForm,
} from "../../components/Form/styles/global";
import { Loading } from "../../components/Loading";
import { useAuthContext } from "../../presentation/contexts/AuthContext";

export function Signup() {
  const { user, isLoading, signUp, signIn, checkAuthStatus } = useAuthContext();

  useEffect(() => {
    // Verificar status de autenticação quando a página carrega
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleAuth0Signup = async () => {
    try {
      // Redirecionar para Auth0 com hint de signup
      window.location.href =
        "http://localhost:3001/auth/login?screen_hint=signup";
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  const handleAuth0Login = async () => {
    try {
      await signIn({ email: "", password: "" }); // Auth0 irá redirecionar
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (!user) {
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
          <h1>Criar Conta</h1>
          <p>Cadastre-se com Auth0 para começar a gerenciar suas finanças</p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Button
              isActive="sign"
              name="signup"
              type="button"
              onClick={handleAuth0Signup}
            >
              Criar Conta com Auth0
            </Button>

            <Button
              isActive="button"
              name="login"
              type="button"
              onClick={handleAuth0Login}
            >
              Já tenho conta - Entrar
            </Button>
          </div>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Autenticação segura fornecida por Auth0
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <IconGoogle
                style={{ width: "24px", height: "24px", opacity: 0.6 }}
              />
              <IconGithub
                style={{ width: "24px", height: "24px", opacity: 0.6 }}
              />
            </div>
            <p
              style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.5rem" }}
            >
              Suporte para Google, GitHub e mais
            </p>
          </div>
        </ContentForm>
      </Container>
    );
  }
  return <Navigate to="/" />;
}
