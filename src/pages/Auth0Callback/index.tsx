import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { useAuthContext } from "../../presentation/contexts/AuthContext";

export function Auth0Callback() {
  const navigate = useNavigate();
  const { checkAuthStatus, isLoading } = useAuthContext();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Aguardar um pouco para o Auth0 processar o callback
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });

        // Verificar o status de autenticação
        await checkAuthStatus();

        // Redirecionar para a página inicial
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Erro no callback do Auth0:", error);
        // Em caso de erro, redirecionar para login
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [checkAuthStatus, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "1rem",
      }}
    >
      <Loading />
      <p>Processando autenticação...</p>
    </div>
  );
}
