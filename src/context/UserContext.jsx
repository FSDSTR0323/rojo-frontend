import { createContext, useEffect, useState } from "react";

import React from 'react'

import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({

    })

    useEffect(() => {
        if(user.token == undefined){
            const token = localStorage.getItem('token') || null
            if(token){setUser(token)
            }else{
            navigate('/login')
            window.localStorage.removeItem('token')} 
        }
    },[])

     

    return <UserContext.Provider value= {{user, setUser}}>
        {children}
        </UserContext.Provider>
}