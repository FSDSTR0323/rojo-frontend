import React from 'react'
import { NavLink } from 'react-router-dom'
import { HOME, LOGIN, LOGOUT, REGISTER } from '../../config/routes'

export const Menu = () => {
	return (
			<nav>
				<ul>
					{
						routes.map((route, index) => (
							<li  key={index}>
								<NavLink to={route.to}>{route.text}</NavLink>
							</li>					
							
						))
					}
				</ul>
			</nav>
	
	)
}

const routes = [
	{
		to: HOME,
		text: 'Home Page'
	},
	{
		to: LOGIN,
		text: 'Login'
	},
	{
		to: REGISTER,
		text: 'Register'
	},
	{
		to: LOGOUT,
		text: 'logout'
	}
]

export default Menu