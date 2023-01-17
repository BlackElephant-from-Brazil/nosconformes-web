import { Home } from 'modules/login/pages/home'
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { privateRoutes } from './private.routes'
import { publicRoutes } from './public.routes'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,

	},
	...publicRoutes,
	...privateRoutes
])

export { router }