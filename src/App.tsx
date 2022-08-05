import Modal from "react-modal";

import { AuthGoogleProvider } from "./contexts/AuthContext";
// import { TransactionsProvider } from "./hooks/useTransactions";
import { AppRoutes } from "./routes/routes";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  return (
    // <TransactionsProvider>
    <AuthGoogleProvider>
      <AppRoutes />
      <GlobalStyle />
    </AuthGoogleProvider>
    // </TransactionsProvider>
  );
}
