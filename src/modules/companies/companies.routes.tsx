import React from 'react'
import { RouteObject } from 'react-router-dom'
import { AddFirstCompany } from './pages/AddFirstCompany'
import { Companies } from './pages/Companies'
import { CompanyDetails } from './pages/CompanyDetails'

const companiesRoutes: RouteObject[] = [
	{
		path: '/cadastre-sua-primeira-empresa',
		element: <AddFirstCompany />
	},
	{
		path: '/empresas',
		element: <Companies />
	},
	{
		path: '/detalhes-da-empresa',
		element: <CompanyDetails />
	},
]

export { companiesRoutes }