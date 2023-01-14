import React from 'react'
import { RouteObject } from 'react-router-dom'
import { AddFirstCompany } from './pages/add-first-company'
import { Companies } from './pages/companies'
import { CompanyDetails } from './pages/company-details'

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