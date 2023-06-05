import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DASHBOARD, ADDRECIPE, HOME } from '../config/routes';
import { currentRole } from '../config/roles';
import { LoginForm } from '../components/LoginForm/LoginForm';
export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    roles: currentRole,
  });

  useEffect(() => {
    if (user.roles == 'admin') {
      navigate(DASHBOARD);
    } else if (user.roles == 'headchef') {
      navigate(ADDRECIPE);
    } else if (user.roles == 'chef') {
      navigate(ADDRECIPE);
    }
  }, [user]);

  const handleLoginButon = () => {};
  return (
    <>
      <LoginForm />
      <NavLink to></NavLink>
    </>
  );
};
