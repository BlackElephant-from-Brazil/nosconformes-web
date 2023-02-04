import React from 'react'
import { RouteObject } from 'react-router-dom'
import { ChangePassword } from './pages/change-password'
import { Login } from './pages/login'
import { RecoverPassword } from './pages/recover-password'

const loginRoutes: RouteObject[] = [
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/recuperar-senha',
		element: <RecoverPassword />,
	},
	{
		path: '/mudar-senha/:email/:_protocol',
		element: <ChangePassword />,
	},
]

export { loginRoutes }
