import { createContext, useState } from "react";

import React from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        token: ''
    })

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
}