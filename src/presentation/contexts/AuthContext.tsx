import React, { createContext, useContext } from "react";
import { useAuth, IUseAuthReturn } from "../../application/hooks/useAuth";
import { dependencyContainer } from "../../shared/utils/DependencyContainer";

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IUseAuthReturn | undefined>(undefined);

function AuthProvider({ children }: IAuthProviderProps) {
  const { authService } = dependencyContainer;
  const authHook = useAuth(authService);

  return (
    <AuthContext.Provider value={authHook}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = (): IUseAuthReturn => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Export the context for testing purposes
export { AuthProvider, AuthContext };
