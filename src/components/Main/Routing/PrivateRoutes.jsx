import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { LOGIN } from '../../../config/routes';
import { Redirect } from './Redirect';

export const PrivateRoutes = () => {
  const { user } = useUser();
  const location = useLocation();

  const isAuth = user.isLoggedIn;
  const permissions = user.info.permissions;
  const intentPath = location.pathname;

  return isAuth ? (
    <Redirect permissions={permissions} intentPath={intentPath} />
  ) : (
    <Navigate to={LOGIN} />
  );
};
