import { createContext, useEffect, useState } from 'react';

import React from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
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
    }
  }, []);

  return (
    //Tornem el context gloval de l' usuari
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
