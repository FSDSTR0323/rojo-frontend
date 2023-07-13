import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { LOGIN } from '../../../config/routes';
import { PERMISSIONS_CONFIG } from '../../../config/routes';
import { DEFAULT_LOGGED_IN_URL } from '../../../config/routes';
import { useEffect } from 'react';

const Redirect = ({ path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, []);

  return <Outlet />;
};

const hasPermission = (permissions, path) => {
  const basePath = `/${path.split('/')[1]}`;
  const permission = PERMISSIONS_CONFIG[basePath];
  return permission ? permissions.includes(permission) : false;
};

export const PrivateRoutes = () => {
  const { user } = useUser();
  const location = useLocation();

  const isAuth = user.isLoggedIn;
  const permissions = user.info?.permissions;
  const intentPath = location.pathname;

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
