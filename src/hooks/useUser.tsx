import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

// Creamos el hook use user para evitar importar el contexto en los componentes que se necesite
export const useUser = () => useContext(UserContext)
