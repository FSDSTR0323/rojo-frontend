import { Outlet, Navigate } from 'react-router-dom';

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DASHBOARD, HOME } from '../../../../config/routes';
import { useUser } from '../../../../hooks/useUser';
import { LOGIN } from '../../../../config/routes';

export const PrivateRoutes = ({ children }) => {
  const { user } = useUser();
  const isAuth = user.isLoggedIn;

  // const isAuth = window.localStorage.getItem("user")


  console.log('privateRoutes isAuth', isAuth);

  return isAuth ? <Outlet /> : <Navigate to={LOGIN} />;
};
