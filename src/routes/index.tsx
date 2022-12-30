import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ChangePassword } from '../modules/login/pages/ChangePassword'
import { Home } from '../modules/login/pages/Home'
import { Login } from '../modules/login/pages/Login'
import { RecoverPassword } from '../modules/login/pages/RecoverPassword'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
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
])

export { router }