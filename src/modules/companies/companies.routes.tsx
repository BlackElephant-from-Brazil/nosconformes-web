import React from 'react'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { redirect, RouteObject } from 'react-router-dom'
import { AddFirstCompany } from './pages/add-first-company'
import { Companies } from './pages/companies'
import { CompanyDetails } from './pages/company-details'

const companiesRoutes: RouteObject[] = [
	{
		path: '/cadastre-sua-primeira-empresa',
		element: <AddFirstCompany />,
	},
	{
		path: '/empresas',
		element: <Companies />,
	},
	{
		path: '/detalhes-da-empresa/:companyId',
		element: <CompanyDetails />,
	},
]

const knowledgeBaseRoutes = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
	if (storagedUser === 'null' && storagedEmployee !== 'null') {
		return redirect('/dashboard-da-empresa')
	}
	if (!storagedUser && !storagedEmployee) {
		return redirect('/login')
	}
	return null
}

const loaderedCompaniesRoutes = companiesRoutes.map(route => {
	return {
		...route,
		loader: knowledgeBaseRoutes,
		element: route.element,
	}
})

export { loaderedCompaniesRoutes }
