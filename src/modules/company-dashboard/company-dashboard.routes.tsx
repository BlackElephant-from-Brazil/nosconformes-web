import React from 'react'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { redirect, RouteObject } from 'react-router-dom'
import { CompanyDashboard } from '.'

const companyDashboardRoutes: RouteObject[] = [
	{
		path: '/dashboard-da-empresa',
		element: <CompanyDashboard />,
	},
]

const loader = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
	if (storagedEmployee === 'null' && storagedUser !== 'null') {
		return redirect('/empresas')
	}
	if (!storagedUser && !storagedEmployee) {
		return redirect('/login')
	}
	return null
}

const loaderedCompanyDashboardRoutes = companyDashboardRoutes.map(route => {
	return {
		...route,
		loader,
		element: route.element,
	}
})

export { loaderedCompanyDashboardRoutes }
