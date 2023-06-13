import { createContext, useEffect, useState } from 'react';

import React from 'react';

import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  //Estat inicial del usuari, no logejat amb un rol de guest
  const [user, setUser] = useState({
    isLoggedIn: false,
    info: { role: 'guest' },
  });

  useEffect(() => {
    //Identifico si l' usuari te un token guardat en local
    if (user.token == undefined) {
      //Es verifica si te una secio activa en el local
      const userLocal = JSON.parse(localStorage.getItem('user')) || null;
      if (userLocal) {
        //Si se verifica que tiene el token lo guardamos en el estado del usuario
        setUser(userLocal);
      } else {
        //Del contrari forço la navegacio al login
        navigate('/login');
        //Eliminar el token del local en cas de que el login ens dongui error i evitar malfuncionaments
        window.localStorage.removeItem('user');
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
