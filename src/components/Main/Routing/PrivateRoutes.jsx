import { useLocation } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { LOGIN } from '../../../config/routes';
import { PERMISSIONS_CONFIG } from '../../../config/routes';
import { DEFAULT_LOGGED_IN_URL } from '../../../config/routes';
import { Redirect } from './Redirect';

export const PrivateRoutes = () => {
  const { user } = useUser();
  const location = useLocation();

  const isAuth = user.isLoggedIn;
  const permissions = user.info?.permissions;
  const intentPath = location.pathname;

  const hasPermission = () => {
    const basePath = `/${intentPath.split('/')[1]}`; // Extract base path from parameter URLs
    const permission = PERMISSIONS_CONFIG[basePath];
    return permission ? permissions.includes(permission) : false;
  };

  return isAuth ? (
    hasPermission(permissions, intentPath) ? (
      <Redirect path={intentPath} />
    ) : (
      <Redirect to={DEFAULT_LOGGED_IN_URL} />
    )
  ) : (
    <Redirect to={LOGIN} />
  );
};
