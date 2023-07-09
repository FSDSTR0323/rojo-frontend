import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import {
  LOGIN,
  RECIPES,
  DASHBOARD,
  USERADMIN,
  RECIPE,
} from '../../../config/routes';

import { PERMISSIONS } from '../../../config/permissions';

const Redirect = ({ path }) => (
  <>
    <Navigate to={path} />
    <Outlet />
  </>
);

export const PrivateRoutes = () => {
  const { user } = useUser();
  const location = useLocation();

  const isAuth = user.isLoggedIn;
  const permissions = user.info.permissions;
  const intentPath = location.pathname;

  const hasPermission = (path) => {
    switch (path) {
      case DASHBOARD:
        return permissions.includes(PERMISSIONS.DASHBOARD_READ);
      case USERADMIN:
        return permissions.includes(PERMISSIONS.USER_READ);
      case RECIPES:
        return permissions.includes(PERMISSIONS.RECIPE_READ);
      case RECIPE:
        return permissions.includes(PERMISSIONS.RECIPE_READ);
      default:
        return false;
    }
  };

  return isAuth ? (
    hasPermission(intentPath) ? (
      <Redirect path={intentPath} />
    ) : (
      <Navigate to={RECIPES} />
    )
  ) : (
    <Navigate to={LOGIN} />
  );
};
