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
    //if (user.roles == 'admin') {
    //navigate(DASHBOARD);
    //} else if (user.roles == 'headchef') {
    //navigate(ADDRECIPE);
    // } else if (user.roles == 'chef') {
    //navigate(ADDRECIPE);
  }, [user]);

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};
