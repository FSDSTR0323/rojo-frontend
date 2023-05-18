import React from 'react'
import "./NavBar.css"
import Logo from "../../assets/Logo.jpeg"

export const NavBar = () => {
  return (    
    <nav>
        <div className='logoName'>
          <img src={Logo} alt="Food Informer Logo" />
          <h1 className='name'>Food Informer</h1>
        </div>
        <div className='loginButtons'>
          <button className='buttons'>Register</button>
          <button className='buttons'>Login</button>
        </div>
    </nav>
  )
}
