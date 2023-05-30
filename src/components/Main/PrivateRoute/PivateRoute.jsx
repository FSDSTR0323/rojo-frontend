import React, {useState, useEffect} from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { ADDRECIPE, DASHBOARD, HOME } from '../../../config/routes'
import roles, { currentRole } from '../../../config/roles'

export const PivateRoute = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        roles: currentRole
    })

    useEffect(() => {
        if(user.roles == 'admin'){
            navigate(DASHBOARD)
        }else if(user.roles == 'headchef'){
            navigate(ADDRECIPE)
        }else if(user.roles == 'chef'){
            navigate(ADDRECIPE)
        }else{
            navigate(HOME)
        }}
    ,[user])

    return (
        <div>
            <Outlet />
        </div>
    )
}
