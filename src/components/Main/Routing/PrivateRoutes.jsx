import { Navigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { LOGIN } from '../../../config/routes';
import { Redirect } from './Redirect';

export const PrivateRoutes = () => {
  const { user } = useUser();
  const isAuth = user.isLoggedIn;
  const permissions = user.info.permissions;

  return isAuth ? (
    <Redirect permissions={permissions} />
  ) : (
    <Navigate to={LOGIN} />
  );
};
