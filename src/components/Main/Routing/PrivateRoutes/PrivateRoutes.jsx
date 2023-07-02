import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../../../../hooks/useUser';
import { LOGIN } from '../../../../config/routes';

export const PrivateRoutes = () => {
  const { user } = useUser();
  console.log('privateRoutes user', user);
  const isAuth = user.isLoggedIn;

  //const isAuth = window.localStorage.getItem('user');

  return isAuth ? <Outlet /> : <Navigate to={LOGIN} />;
};
