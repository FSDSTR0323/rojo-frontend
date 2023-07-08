import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { LOGIN } from '../../../config/routes';

export const PrivateRoutes = () => {
  const { user } = useUser();
  console.log('privateRoutes user', user);
  const isAuth = user.isLoggedIn;

  return isAuth ? <Outlet /> : <Navigate to={LOGIN} />;
};
