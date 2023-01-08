import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../modules/login/pages/Home'
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