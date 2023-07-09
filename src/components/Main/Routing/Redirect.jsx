import { PERMISSIONS } from '../../../config/permissions';
import { DASHBOARD, RECIPES, USERADMIN } from '../../../config/routes';
import { Outlet, Navigate } from 'react-router-dom';

const Reroute = ({ path }) => (
  <>
    <Navigate to={path} />
    <Outlet />
  </>
);

export const Redirect = ({ permissions, intentPath }) => {
  if (
    intentPath === DASHBOARD &&
    permissions.includes(PERMISSIONS.DASHBOARD_READ)
  ) {
    return <Reroute path={DASHBOARD} />;
  } else if (
    intentPath === USERADMIN &&
    permissions.includes(PERMISSIONS.USER_READ)
  ) {
    return <Reroute path={USERADMIN} />;
  } else {
    return <Reroute path={intentPath} />;
  }
};
