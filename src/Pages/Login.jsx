import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DASHBOARD, ADDRECIPE, HOME } from '../config/routes';
import { LoginForm } from '../components/LoginForm/LoginForm';
import Header from '../components/Header/Header';
import { useUser } from '../hooks/useUser';

export const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate(DASHBOARD);
    }
  }, [user]);

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};
