import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { LOGIN } from '../../../config/routes';
import { PERMISSIONS_CONFIG } from '../../../config/routes';
import { DEFAULT_LOGGED_IN_URL } from '../../../config/routes';

const Redirect = ({ path }) => (
  <>
    <Navigate to={path} />
    <Outlet />
  </>
);

const hasPermission = (permissions, path) => {
  const permission = PERMISSIONS_CONFIG[path];
  return permission ? permissions.includes(permission) : false;
};

export const PrivateRoutes = () => {
  const { user } = useUser();
  const location = useLocation();

  const isAuth = user.isLoggedIn;
  const permissions = user.info.permissions;
  const intentPath = location.pathname;

  return isAuth ? (
    hasPermission(permissions, intentPath) ? (
      <Redirect path={intentPath} />
    ) : (
      <Navigate to={DEFAULT_LOGGED_IN_URL} />
    )
  ) : (
    <Navigate to={LOGIN} />
  );
};
