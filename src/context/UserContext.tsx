import { createContext, useState, ReactNode } from 'react';
import { User, UserContextType } from './types';


export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUserData = localStorage.getItem('user');
    return storedUserData
      ? JSON.parse(storedUserData)
      : { isLoggedIn: false, info: { role: 'guest' } };
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


