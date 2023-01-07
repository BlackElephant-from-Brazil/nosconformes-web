import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { companiesRoutes } from '../modules/companies/companies.routes'
import { configurationsRoutes } from '../modules/configurations/configurations.routes'
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes'
import { knowledgeBaseRoutes } from '../modules/knowledgeBase/knowledge-base.routes'
import { loginRoutes } from '../modules/login/login.routes'
import { Home } from '../modules/login/pages/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,

	},
	...loginRoutes,
	...companiesRoutes,
	...configurationsRoutes,
	...knowledgeBaseRoutes,
	...dashboardRoutes
])

export { router }