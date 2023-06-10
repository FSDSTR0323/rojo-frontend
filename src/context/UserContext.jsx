import { createContext, useEffect, useState } from 'react';

import React from 'react';

import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    isLoggedIn: false,
    info: { role: 'guest' },
  });

  useEffect(() => {
    if (user.token == undefined) {
      const userLocal = JSON.parse(localStorage.getItem('user')) || null;
      if (userLocal) {
        setUser(userLocal);
      } else {
        navigate('/login');
        window.localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
