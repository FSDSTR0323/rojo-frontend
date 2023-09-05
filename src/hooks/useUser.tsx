import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextType } from '../context/types';

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser should be used in a UserProvider');
  }
  return context;
};
