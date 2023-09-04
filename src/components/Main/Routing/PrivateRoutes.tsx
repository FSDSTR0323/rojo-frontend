import { useLocation } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import {
  LOGIN,
  PERMISSIONS_CONFIG,
  DEFAULT_LOGGED_IN_URL
} from '../../../config/routes'
import { Redirect } from './Redirect'

export const PrivateRoutes = () => {
  const { user } = useUser()
  const location = useLocation()

  const isAuth = user.isLoggedIn
  const permissions = user.info?.permissions
  const intentPath = location.pathname

  const hasPermission = () => {
    const basePath = `/${intentPath.split('/')[1]}` // Extract base path from parameter URLs
    const permission = PERMISSIONS_CONFIG[basePath]
    return permission ? permissions.includes(permission) : false
  }

  return isAuth
    ? (
        hasPermission(permissions, intentPath)
          ? (
              <Redirect path={intentPath} />
            )
          : (
              <Redirect path={DEFAULT_LOGGED_IN_URL} />
            )
      )
    : (
        <Redirect path={LOGIN} />
      )
}
