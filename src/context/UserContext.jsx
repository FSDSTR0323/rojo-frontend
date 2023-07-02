import { createContext, useEffect, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    // isLoggedIn: false,
    // info: { role: 'guest' },
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedUserData) {
      console.log('getting user from localStorage');
      console.log('local storage user', storedUserData);
      setUser(storedUserData);
    }

    // if (user.token == undefined) {
    //   const userLocal = JSON.parse(localStorage.getItem('user')) || null;
    //   if (userLocal) {
    //     setUser(userLocal);
    //   } else {
    //     window.localStorage.removeItem('user');
    //     setUser((previousState) => ({ ...previousState, isLoggedIn: false }));
    //   }
    // }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
