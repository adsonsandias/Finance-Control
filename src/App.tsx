import Modal from "react-modal";

import { AuthProvider } from "./presentation/contexts/AuthContext";
import { TransactionProvider } from "./presentation/contexts/TransactionContext";
import { AppRoutes } from "./routes/routes";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppRoutes />
        <GlobalStyle />
      </TransactionProvider>
    </AuthProvider>
  );
}
