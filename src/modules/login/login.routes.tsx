import React from 'react'
import { RouteObject } from 'react-router-dom'
import { ChangePassword } from './pages/ChangePassword'
import { Login } from './pages/Login'
import { RecoverPassword } from './pages/RecoverPassword'

const loginRoutes: RouteObject[] = [
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/recuperar-senha',
		element: <RecoverPassword />
	},
	{
		path: '/mudar-senha',
		element: <ChangePassword />
	}
]

export { loginRoutes }