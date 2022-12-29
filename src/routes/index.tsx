import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { RecoverPassword } from '../pages/RecoverPassword'
import { ChangePassword } from '../pages/ChangePassword'

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