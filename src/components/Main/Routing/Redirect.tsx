import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Redirect = ({ path }) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(path)
  }, [])

  return <Outlet />
}
