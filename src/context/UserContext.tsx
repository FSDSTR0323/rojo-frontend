import { createContext, useState, type ReactNode } from 'react'
import { type User, type UserContextType } from '../types'

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUserData = localStorage.getItem('user')
    return storedUserData !== null
      ? JSON.parse(storedUserData)
      : { isLoggedIn: false, info: { role: 'guest' } }
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
