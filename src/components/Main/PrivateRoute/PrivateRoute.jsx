import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { ADDRECIPE, DASHBOARD, HOME } from '../../../config/routes';
import { useUser } from '../../../hooks/useUser';

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    user.roles;
    () => {};
    if (user.info.role == 'admin') {
      navigate(DASHBOARD);
    } else if (user.info.role == 'headchef') {
      navigate(ADDRECIPE);
    } else if (user.info.role == 'chef') {
      navigate(ADDRECIPE);
    } else {
      navigate(HOME);
    }
  }, [user]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
