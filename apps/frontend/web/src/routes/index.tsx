import { Navigate, Outlet } from 'react-router-dom'

import { useAuthContext } from '../presentation/contexts/AuthContext'

export function PrivateRoutes() {
  const { user, isLoading } = useAuthContext()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return user ? <Outlet /> : <Navigate to="/signin" />
}
