import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME } from '../../../config/routes';
import { useUser } from '../../../hooks/useUser';
import Header from '../../Header/Header';

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate(HOME);
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};
