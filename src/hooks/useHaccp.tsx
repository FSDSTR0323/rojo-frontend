import { useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext'

export const useHaccp = () => useContext(RecipeContext)
