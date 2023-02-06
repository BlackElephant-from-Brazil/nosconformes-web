import React from 'react'
import { RouteObject } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'

const dashboardRoutes: RouteObject[] = [
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
]

export { dashboardRoutes }
