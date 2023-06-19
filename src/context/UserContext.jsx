import { createContext, useEffect, useState } from 'react';

import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { HOME, LOGIN, REGISTER } from '../config/routes';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = [HOME, LOGIN, REGISTER];
  const [user, setUser] = useState({
    isLoggedIn: true,
    info: { role: 'guest' },
  });

  useEffect(() => {
    if (user.token == undefined) {
      const userLocal = JSON.parse(localStorage.getItem('user')) || null;
      if (userLocal) {
        setUser(userLocal);
      } else {
        window.localStorage.removeItem('user');
        setUser((previousState) => ({ ...previousState, isLoggedIn: false }));
      }
      if (!publicRoutes.includes(location.pathname)) navigate('/login');
    }
  }, []);

  return (
    //Tornem el context gloval de l' usuari
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
