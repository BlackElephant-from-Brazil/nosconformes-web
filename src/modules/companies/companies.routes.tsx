import React from 'react'
import { RouteObject } from 'react-router-dom'
import { AddFirstCompany } from './pages/AddFirstCompany'
import { Companies } from './pages/Companies'

const companiesRoutes: RouteObject[] = [
	{
		path: '/cadastre-sua-primeira-empresa',
		element: <AddFirstCompany />
	},
	{
		path: '/empresas',
		element: <Companies />
	},
]

export { companiesRoutes }