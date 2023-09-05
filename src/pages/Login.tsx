import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { DASHBOARD } from '../config/routes'
import { LoginForm } from '../components/Forms/LoginForm'

export const Login = () => {
  const { user } = useUser()
  const isAuth = user.isLoggedIn

  return isAuth ? <Navigate to={DASHBOARD} /> : <LoginForm />
}
