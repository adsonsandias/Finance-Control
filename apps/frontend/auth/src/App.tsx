import Modal from 'react-modal'

import { AuthProvider } from './presentation/contexts/AuthContext'
import { TransactionProvider } from './presentation/contexts/TransactionContext'
import { AppRoutes } from './routes/routes'
import { initializeServices } from './services'
import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root')

// Initialize services before rendering
initializeServices()

export function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppRoutes />
        <GlobalStyle />
      </TransactionProvider>
    </AuthProvider>
  )
}
