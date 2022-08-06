import Modal from "react-modal";

import { AuthGoogleProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/routes";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  return (
    <AuthGoogleProvider>
      <AppRoutes />
      <GlobalStyle />
    </AuthGoogleProvider>
  );
}
