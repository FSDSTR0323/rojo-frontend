import { Navigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm/LoginForm'
import { useUser } from '../hooks/useUser'
import { DASHBOARD } from '../config/routes'

export const Login = () => {
  const { user } = useUser()
  const isAuth = user.isLoggedIn

  return isAuth ? <Navigate to={DASHBOARD} /> : <LoginForm />
}
