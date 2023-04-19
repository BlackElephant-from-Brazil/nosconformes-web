import React from 'react'
import { RouteObject, redirect } from 'react-router-dom'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { Profile } from './pages/profile'
import { Users } from './pages/users'

const settingsRoutes: RouteObject[] = [
	{
		path: '/perfil',
		element: <Profile />,
	},
	{
		path: '/usuarios',
		element: <Users />,
	},
]

const loader = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
	if (!storagedUser && !storagedEmployee) {
		return redirect('/login')
	}
	return null
}

const loaderedSettingsRoutes = settingsRoutes.map(route => {
	return {
		...route,
		loader,
		element: route.element,
	}
})

export { loaderedSettingsRoutes }
