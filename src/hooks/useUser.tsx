import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { type UserContextType } from '../types'

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser should be used in a UserProvider')
  }
  return context
}
