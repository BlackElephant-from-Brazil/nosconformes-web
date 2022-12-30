import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { companiesRoutes } from '../modules/companies/companies.routes'
import { loginRoutes } from '../modules/login/login.routes'
import { Home } from '../modules/login/pages/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	...loginRoutes,
	...companiesRoutes
])

export { router }